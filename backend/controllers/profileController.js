const asyncHandler = require('express-async-handler');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const User = require('../models/User');
const Problem = require('../models/Problem');


const uploadBufferToCloudinary = (buffer, options) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });


const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const [totalSolved] = await Promise.all([
    Problem.countDocuments({ user: req.user.id, status: 'Solved' }),
  ]);

  res.status(200).json({
    success: true,
    profile: {
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      targetCompany: user.targetCompany,
      targetRole: user.targetRole,
      github: user.github,
      linkedin: user.linkedin,
      resume: user.resume,
      dailyGoal: user.dailyGoal,
      weeklyGoal: user.weeklyGoal,
      memberSince: user.createdAt,
    },
    stats: {
      totalSolved,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    },
  });
});



const updateProfile = asyncHandler(async (req, res) => {


  const allowedFields = ['targetCompany', 'targetRole', 'github', 'linkedin', 'dailyGoal', 'weeklyGoal'];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    profile: {
      targetCompany: user.targetCompany,
      targetRole: user.targetRole,
      github: user.github,
      linkedin: user.linkedin,
      dailyGoal: user.dailyGoal,
      weeklyGoal: user.weeklyGoal,
    },
  });
});


const uploadProfilePhoto = asyncHandler(async (req, res) => {

  if (!req.file) {
    res.status(400);
    throw new Error('No image file provided (field name must be "photo")');
  }

  const user = await User.findById(req.user.id);

 
  if (user.profilePhoto && user.profilePhoto.publicId) {
    await cloudinary.uploader.destroy(user.profilePhoto.publicId).catch(() => { });
  }

  const result = await uploadBufferToCloudinary(req.file.buffer, {
    folder: 'preppilot-ai/profile-photos',
    public_id: `user_${req.user.id}`,
    overwrite: true,
    resource_type: 'image',
  });

  user.profilePhoto = { url: result.secure_url, publicId: result.public_id };
  await user.save();

  res.status(200).json({ success: true, profilePhoto: user.profilePhoto });
});


const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No document file provided (field name must be "resume")');
  }

  const user = await User.findById(req.user.id);

  if (user.resume && user.resume.publicId) {
    await cloudinary.uploader.destroy(user.resume.publicId, { resource_type: 'raw' }).catch(() => { });
  }

  const result = await uploadBufferToCloudinary(req.file.buffer, {
    folder: 'preppilot-ai/resumes',
    public_id: `resume_${req.user.id}_${Date.now()}`,
    resource_type: 'raw', // non-image files (pdf/doc) must use 'raw' in Cloudinary
  });

  user.resume = { url: result.secure_url, publicId: result.public_id, uploadedAt: new Date() };
  await user.save();

  res.status(200).json({ success: true, resume: user.resume });
});

module.exports = { getProfile, updateProfile, uploadProfilePhoto, uploadResume };
