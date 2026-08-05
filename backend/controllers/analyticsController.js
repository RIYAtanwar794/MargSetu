const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Problem = require('../models/Problem');

const MIN_SAMPLES_FOR_INSIGHT = 2; 
const STALE_REVISION_THRESHOLD_DAYS = 7;


const getAnalytics = asyncHandler(async (req, res) => {

  const userId = new mongoose.Types.ObjectId(req.user.id);

  const now = new Date();

 
  // Overview
  const [
    totalProblems,
    solved,
    attempted,
    todo,
    bookmarked,
    revisionDue,
    favorites,
  ] = await Promise.all([

    Problem.countDocuments({ user: userId }),

    Problem.countDocuments({
      user: userId,
      status: "Solved",
    }),

    Problem.countDocuments({
      user: userId,
      status: "Attempted",
    }),

    Problem.countDocuments({
      user: userId,
      status: "Todo",
    }),

    Problem.countDocuments({
      user: userId,
      status: "Bookmarked",
    }),

    Problem.countDocuments({
      user: userId,
      nextRevisionDate: { $lte: now },
    }),

    Problem.countDocuments({
      user: userId,
      isFavorite: true,
    }),

  ]);



  const avgTime = await Problem.aggregate([
    {
      $match: {
        user: userId,
        status: "Solved",
        timeTaken: { $gt: 0 },
      },
    },

    {
      $group: {
        _id: null,
        avg: { $avg: "$timeTaken" },
      },
    },

  ]);


  const accuracy =
    solved + attempted === 0
      ? 0
      : Math.round((solved / (solved + attempted)) * 100);



  const difficulty = await Problem.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: "$difficulty",
        count: { $sum: 1 },
      },
    },
  ]);



  const monthlyProgress = await Problem.aggregate([
    {
      $match: {
        user: userId,
        status: "Solved",
        solvedDate: { $ne: null },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$solvedDate" },
          month: { $month: "$solvedDate" },
        },
        solved: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedMonthlyProgress = monthlyProgress.map((item) => ({
    month: `${monthNames[item._id.month]} ${item._id.year}`,
    solved: item.solved,
  }));

  const topicDistribution = await Problem.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: "$topic",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $limit: 8
    }
  ]);

  const roadmapProgress = await Problem.aggregate([
    {
      $match: {
        user: userId,
        roadmapCompany: { $ne: "" },
        status: "Solved",
      },
    },
    {
      $group: {
        _id: "$roadmapCompany",
        solved: { $sum: 1 },
      },
    },
    {
      $sort: {
        solved: -1,
      },
    },
  ]);

  const recentActivity = await Problem.find({
    user: userId,
    status: "Solved",
  })
    .sort({ solvedDate: -1 })
    .limit(8)
    .select("title topic difficulty platform solvedDate");

  res.json({

    success: true,
    overview: {
      totalProblems,
      solved,
      attempted,
      todo,
      bookmarked,
      revisionDue,
      favorites,
      accuracy,

      avgSolveTime:
        avgTime.length > 0
          ? Math.round(avgTime[0].avg)
          : 0,

    },
    difficulty: {
      easy: difficulty.find((d) => d._id === "Easy")?.count || 0,
      medium: difficulty.find((d) => d._id === "Medium")?.count || 0,
      hard: difficulty.find((d) => d._id === "Hard")?.count || 0,
    },

    monthlyProgress: formattedMonthlyProgress,

    topicDistribution: topicDistribution.map((item) => ({
      topic: item._id,
      count: item.count,
    })),

    roadmapProgress: roadmapProgress.map((item) => ({
      company: item._id,
      solved: item.solved,
    })),

    recentActivity,
  });
});



const getInsights = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const insights = [];


  const topicStats = await Problem.aggregate([
    { $match: { user: userId, status: { $in: ['Solved', 'Attempted'] } } },
    {
      $group: {
        _id: '$topic',
        solvedCount: { $sum: { $cond: [{ $eq: ['$status', 'Solved'] }, 1, 0] } },
        attemptedCount: { $sum: { $cond: [{ $eq: ['$status', 'Attempted'] }, 1, 0] } },
        avgTimeTaken: { $avg: { $cond: [{ $eq: ['$status', 'Solved'] }, '$timeTaken', null] } },
      },
    },
  ]);


  const eligibleTopics = topicStats
    .map((t) => ({
      topic: t._id,
      total: t.solvedCount + t.attemptedCount,
      struggleRatio: t.attemptedCount / (t.solvedCount + t.attemptedCount),
      avgTimeTaken: t.avgTimeTaken || 0,
    }))
    .filter((t) => t.total >= MIN_SAMPLES_FOR_INSIGHT);

  if (eligibleTopics.length > 0) {
    const weakestByStruggle = [...eligibleTopics].sort((a, b) => b.struggleRatio - a.struggleRatio)[0];

    if (weakestByStruggle.struggleRatio > 0) {
      insights.push({
        type: 'weakest_topic',
        message: `Your weakest topic is ${weakestByStruggle.topic} — you have unsolved attempts there more often than in other topics.`,
      });
    } else {

      const slowestTopic = [...eligibleTopics].sort((a, b) => b.avgTimeTaken - a.avgTimeTaken)[0];
      if (slowestTopic && slowestTopic.avgTimeTaken > 0) {
        insights.push({
          type: 'slowest_topic',
          message: `${slowestTopic.topic} is taking you the longest on average (${Math.round(
            slowestTopic.avgTimeTaken
          )} min/problem) — worth extra practice.`,
        });
      }
    }
  }

  // ---- 2. Average time taken per difficulty ----
  const difficultyStats = await Problem.aggregate([
    { $match: { user: userId, status: 'Solved', timeTaken: { $gt: 0 } } },
    { $group: { _id: '$difficulty', avgTime: { $avg: '$timeTaken' }, count: { $sum: 1 } } },
  ]);

  difficultyStats.forEach((d) => {
    insights.push({
      type: 'avg_time_by_difficulty',
      message: `${d._id} problems take you ${Math.round(d.avgTime)} minutes on average (based on ${d.count} solved).`,
    });
  });

  // ---- 3. Stale revisions: topics you haven't revised in a while ----
  const now = new Date();
  const overdueProblems = await Problem.find({
    user: userId,
    status: 'Solved',
    nextRevisionDate: { $lt: now },
  }).select('topic nextRevisionDate');

  const staleByTopic = {};
  overdueProblems.forEach((p) => {
    const daysOverdue = Math.floor((now - p.nextRevisionDate) / (1000 * 60 * 60 * 24));
    if (!staleByTopic[p.topic] || daysOverdue > staleByTopic[p.topic]) {
      staleByTopic[p.topic] = daysOverdue;
    }
  });

  const staleTopics = Object.entries(staleByTopic)
    .filter(([, days]) => days >= STALE_REVISION_THRESHOLD_DAYS)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3); // top 3 most-overdue topics, otherwise this gets noisy

  staleTopics.forEach(([topic, days]) => {
    insights.push({
      type: 'stale_revision',
      message: `You haven't revised ${topic} in ${days} days.`,
    });
  });

  res.status(200).json({
    success: true,
    insights,
    raw: { topicStats: eligibleTopics, difficultyStats, staleTopics },
  });
});


module.exports = {
  getAnalytics,
  getInsights,
};