const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a problem title'],
      trim: true,
    },
    link: {
      type: String,
      trim: true,
      default: '',
    },
    platform: {
      type: String,
      enum: ['LeetCode', 'Codeforces', 'GeeksforGeeks', 'HackerRank', 'InterviewBit', 'CodeChef', 'AtCoder', 'Other'],
      default: 'LeetCode',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    topic: {
      type: String,
      required: [true, 'Please add a primary topic (e.g. Arrays, Graphs, DP)'],
      trim: true,
      index: true,
    },
    subtopic: {
      type: String,
      trim: true,
      default: '',
    },
    companyTags: {
      type: [String],
      default: [],
    },
    roadmapCompany: {
      type: String,
      default: "",
    },
    timeTaken: {
      type: Number, 
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Solved', 'Attempted', 'Todo', 'Bookmarked'],
      default: 'Solved',
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    solvedDate: {
      type: Date,
      default: null,
    },
    revisionCount: {
      type: Number,
      default: 0,
    },
    nextRevisionDate: {
      type: Date,
      default: null, 
      index: true,
    },
    revisionHistory: [
      {
        revisedOn: { type: Date, default: Date.now },
        intervalDaysUsed: Number, 
      },
    ],
  },
  { timestamps: true }
);


ProblemSchema.index({ title: 'text', topic: 'text', subtopic: 'text', notes: 'text' });

module.exports = mongoose.model('Problem', ProblemSchema);
