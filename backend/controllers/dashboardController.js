const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Problem = require('../models/Problem');
const User = require('../models/User');

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const startOfWeek = () => {
  const d = startOfToday();
  const day = d.getDay(); // 0 = Sunday
  d.setDate(d.getDate() - day);
  return d;
};


const getDashboardCards = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  const todayStart = startOfToday();
  const weekStart = startOfWeek();
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [
    totalSolved,
    solvedToday,
    solvedThisWeek,
    revisionDueCount,
  ] = await Promise.all([
    Problem.countDocuments({ user: userId, status: 'Solved' }),
    Problem.countDocuments({ user: userId, status: 'Solved', solvedDate: { $gte: todayStart } }),
    Problem.countDocuments({ user: userId, status: 'Solved', solvedDate: { $gte: weekStart } }),
    Problem.countDocuments({ user: userId, status: 'Solved', nextRevisionDate: { $lte: endOfToday } }),
  ]);
  

  res.status(200).json({
    success: true,
    cards: {
      questionsSolved: { total: totalSolved, today: solvedToday, thisWeek: solvedThisWeek },
      todaysGoal: { target: user.dailyGoal, achieved: solvedToday },
      weeklyGoal: { target: user.weeklyGoal, achieved: solvedThisWeek },
      currentStreak: user.currentStreak,
      revisionDue: revisionDueCount,
      targetCompany: user.targetCompany,
    },
  });
});



const getDashboardCharts = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [topicDistribution, difficultyDistribution] = await Promise.all([
    Problem.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), status: 'Solved' } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Problem.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), status: 'Solved' } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } },
    ]),
  ]);


  // Weekly progress: problems solved per day for the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const recentSolved = await Problem.find({
    user: userId,
    status: 'Solved',
    solvedDate: { $gte: sevenDaysAgo },
  }).select('solvedDate');

  // Build a 7-day map so days with 0 solves still show up in the chart
  const weeklyProgress = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    day.setHours(0, 0, 0, 0);
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);

    const count = recentSolved.filter(
      (p) => p.solvedDate >= day && p.solvedDate < nextDay
    ).length;

    weeklyProgress.push({ date: day.toISOString().split('T')[0], count });
  }

  res.status(200).json({
    success: true,
    charts: {
      topicDistribution: topicDistribution.map((t) => ({ topic: t._id, count: t.count })),
      difficultyDistribution: difficultyDistribution.map((d) => ({ difficulty: d._id, count: d.count })),
      weeklyProgress,
    },
  });
});

module.exports = { getDashboardCards, getDashboardCharts };
