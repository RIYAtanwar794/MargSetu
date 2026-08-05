const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please add a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },

    profilePhoto: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' }, 
    },
    targetCompany: { type: String, default: '' },
    targetRole: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    resume: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      uploadedAt: { type: Date },
    },

    dailyGoal: { type: Number, default: 3 }, 
    weeklyGoal: { type: Number, default: 15 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastSolvedDate: { type: Date, default: null }, 
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);


// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



UserSchema.methods.registerSolveActivity = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!this.lastSolvedDate) {
    this.currentStreak = 1;
  } else {
    const last = new Date(this.lastSolvedDate);
    last.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
    } else if (diffDays === 1) {
      this.currentStreak += 1;
    } else {
      this.currentStreak = 1; 
    }
  }

  this.longestStreak = Math.max(this.longestStreak, this.currentStreak);
  this.lastSolvedDate = today;
};

module.exports = mongoose.model('User', UserSchema);
