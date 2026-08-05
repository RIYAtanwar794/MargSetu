const asyncHandler = require('express-async-handler');
const Problem = require('../models/Problem');
const User = require('../models/User');

const REVISION_INTERVALS = [1, 3, 7, 16, 35];

const getIntervalForCount = (revisionCount) => {
  const idx = Math.min(revisionCount, REVISION_INTERVALS.length - 1);
  return REVISION_INTERVALS[idx];
};


const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    link,
    platform,
    difficulty,
    topic,
    subtopic,
    companyTags,
    roadmapCompany,
    timeTaken,
    notes,
    status,
    isFavorite,
    solvedDate,
  } = req.body;

  if (!title || !difficulty || !topic) {
    res.status(400);
    throw new Error('Title, difficulty and topic are required');
  }

  const existingProblem = await Problem.findOne({
    user: req.user.id,
    title,
  });

  if (existingProblem) {
    res.status(400);
    throw new Error("Problem already exists in your tracker.");
  }

  const problemData = {
    user: req.user.id,
    title,
    link,
    platform,
    difficulty,
    topic,
    subtopic,
    companyTags,
    roadmapCompany,
    timeTaken,
    notes,
    status: status || 'Solved',
    isFavorite: !!isFavorite,
  };


  if (problemData.status === 'Solved') {
    problemData.solvedDate = solvedDate || new Date();
    problemData.nextRevisionDate = new Date(
      Date.now() + getIntervalForCount(0) * 24 * 60 * 60 * 1000
    );

    const user = await User.findById(req.user.id);
    user.registerSolveActivity();
    await user.save();
  }

  const problem = await Problem.create(problemData);
  res.status(201).json({ success: true, problem });
});


const getProblems = asyncHandler(async (req, res) => {
  const {
    search,
    topic,
    difficulty,
    status,
    platform,
    isFavorite,
    companyTag,
    sortBy,
    order,
    page,
    limit,
  } = req.query;

  const query = { user: req.user.id };

  if (topic) query.topic = topic;
  if (difficulty) query.difficulty = difficulty;
  if (status) query.status = status;
  if (platform) query.platform = platform;
  if (isFavorite !== undefined) query.isFavorite = isFavorite === 'true';
  if (companyTag) query.companyTags = companyTag;

  if (search) {
    query.$text = { $search: search };
  }

  const sortField = ['solvedDate', 'timeTaken', 'revisionCount', 'createdAt'].includes(sortBy)
    ? sortBy
    : 'createdAt';
  const sortOrder = order === 'asc' ? 1 : -1;

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;
  const skip = (pageNum - 1) * limitNum;

  const [problems, total] = await Promise.all([
    Problem.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limitNum),
    Problem.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: problems.length,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    problems,
  });
});



const getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ _id: req.params.id, user: req.user.id });

  if (!problem) {
    res.status(404);
    throw new Error('Problem not found');
  }

  res.status(200).json({ success: true, problem });
});


const updateProblem = asyncHandler(async (req, res) => {
  let problem = await Problem.findOne({ _id: req.params.id, user: req.user.id });

  if (!problem) {
    res.status(404);
    throw new Error('Problem not found');
  }

  const wasNotSolved = problem.status !== 'Solved';
  const isBeingMarkedSolved = req.body.status === 'Solved';

  problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });



  if (wasNotSolved && isBeingMarkedSolved) {
    problem.solvedDate = problem.solvedDate || new Date();
    problem.nextRevisionDate = new Date(
      Date.now() + getIntervalForCount(0) * 24 * 60 * 60 * 1000
    );
    await problem.save();

    const user = await User.findById(req.user.id);
    user.registerSolveActivity();
    await user.save();
  }

  res.status(200).json({ success: true, problem });
});


const deleteProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOneAndDelete({ _id: req.params.id, user: req.user.id });

  if (!problem) {
    res.status(404);
    throw new Error('Problem not found');
  }

  res.status(200).json({ success: true, message: 'Problem deleted' });
});


const markAsRevised = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ _id: req.params.id, user: req.user.id });

  if (!problem) {
    res.status(404);
    throw new Error('Problem not found');
  }

  const intervalDays = getIntervalForCount(problem.revisionCount + 1);

  problem.revisionHistory.push({
    revisedOn: new Date(),
    intervalDaysUsed: intervalDays,
  });
  problem.revisionCount += 1;
  problem.nextRevisionDate = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);

  await problem.save();

  res.status(200).json({ success: true, problem });
});


const getDueRevisions = asyncHandler(async (req, res) => {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const dueProblems = await Problem.find({
    user: req.user.id,
    status: 'Solved',
    nextRevisionDate: { $lte: endOfToday },
  }).sort({ nextRevisionDate: 1 });

  res.status(200).json({ success: true, count: dueProblems.length, problems: dueProblems });
});


const getRevisionQueue = asyncHandler(async (req, res) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const sevenDaysOut = new Date();
  sevenDaysOut.setDate(sevenDaysOut.getDate() + 7);
  sevenDaysOut.setHours(23, 59, 59, 999);

  const [overdue, dueToday, upcoming] = await Promise.all([
    Problem.find({
      user: req.user.id,
      status: 'Solved',
      nextRevisionDate: { $lt: startOfToday },
    }).sort({ nextRevisionDate: 1 }),
    Problem.find({
      user: req.user.id,
      status: 'Solved',
      nextRevisionDate: { $gte: startOfToday, $lte: endOfToday },
    }).sort({ nextRevisionDate: 1 }),
    Problem.find({
      user: req.user.id,
      status: 'Solved',
      nextRevisionDate: { $gt: endOfToday, $lte: sevenDaysOut },
    }).sort({ nextRevisionDate: 1 }),
  ]);

  res.status(200).json({
    success: true,
    queue: {
      overdue,
      dueToday,
      upcoming,
    },
    counts: {
      overdue: overdue.length,
      dueToday: dueToday.length,
      upcoming: upcoming.length,
    },
  });
});

module.exports = {
  createProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
  markAsRevised,
  getDueRevisions,
  getRevisionQueue,
};
