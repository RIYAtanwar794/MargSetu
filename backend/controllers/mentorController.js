const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const { getGeminiModel } = require('../config/gemini');
const User = require('../models/User');
const Problem = require('../models/Problem');
const MentorMessage = require('../models/MentorMessage');

const HISTORY_LIMIT = 15; 


const gatherUserContext = async (userId) => {
  const [user, topicStats, totalSolved] = await Promise.all([
    User.findById(userId),
    Problem.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$topic',
          solved: { $sum: { $cond: [{ $eq: ['$status', 'Solved'] }, 1, 0] } },
          attempted: { $sum: { $cond: [{ $eq: ['$status', 'Attempted'] }, 1, 0] } },
        },
      },
    ]),
    Problem.countDocuments({ user: userId, status: 'Solved' }),
  ]);

  const strugglingTopics = topicStats
    .filter((t) => t.attempted + t.solved >= 2)
    .map((t) => ({ topic: t._id, struggleRatio: t.attempted / (t.attempted + t.solved) }))
    .sort((a, b) => b.struggleRatio - a.struggleRatio)
    .slice(0, 2);

  return {
    name: user?.name || "Student",
    targetCompany: user.targetCompany || 'not set',
    targetRole: user.targetRole || 'not set',
    currentStreak: user?.currentStreak || 0,
    totalSolved: totalSolved || 0,
    weakTopics: strugglingTopics.map((t) => t.topic),
  };
};


const buildSystemInstruction = (context) => `
You are the AI Mentor inside PrepPilot AI, a placement/interview preparation app.
You are NOT a generic chatbot - you have real context about this specific student
and must use it to personalize every answer. Never give generic advice when
their data is available to make it specific.

Student context:
- Name: ${context.name}
- Target company: ${context.targetCompany}
- Target role: ${context.targetRole}
- Total problems solved: ${context.totalSolved}
- Current daily solving streak: ${context.currentStreak} days
- Weak topics (based on unsolved attempts vs solved): ${context.weakTopics.length ? context.weakTopics.join(', ') : 'none identified yet'}


You handle four kinds of requests:
1. Roadmap creation - e.g. "I have a Google interview in 25 days." Build a
   realistic day-by-day or week-by-week plan considering their current
   solved count, weak topics, and the time remaining. Be specific with
   topic ordering and problem counts, not vague advice.
2. Practice strategy - e.g. "I'm weak in Dynamic Programming." Suggest a
   concrete practice sequence (easy -> medium -> hard progression, pattern
   families to master, roughly how many problems before moving on).
3. Concept explanation - e.g. "Explain Dijkstra." Explain clearly with an
   example, at a level appropriate for interview prep (not a textbook essay).
4. Question generation - e.g. "Generate 5 Amazon Graph questions." Generate
   realistic, appropriately-difficulty-tagged practice questions matching
   the company/topic asked, formatted as a numbered list with difficulty tags.

Keep responses focused and actionable - this is exam-prep under time
pressure, not a leisurely discussion. Use their weak topics and goals
proactively even if they don't explicitly ask about them, where relevant.

Formatting Rules:

- Use proper markdown.
- Use headings.
- Use bullet points.
- Use numbered lists.
- Use tables whenever comparison is useful.
- Use code blocks with language names.
- Keep explanations interview-oriented.
- Never give one-line answers.
- Never answer like a generic chatbot.
- Always personalize using the student's weak topics and goals.
`;



const chatWithMentor = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    res.status(400);
    throw new Error('Message is required');
  }

  const context = await gatherUserContext(req.user.id);
  const systemInstruction = buildSystemInstruction(context);

  const recentMessages = await MentorMessage.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(HISTORY_LIMIT);
  const history = recentMessages
    .reverse()
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));


  
  const geminiModel = getGeminiModel(systemInstruction);
  const chat = geminiModel.startChat({ history });

  const result = await chat.sendMessage(message);
  const replyText = result.response.text().trim();

  // persist both sides of the exchange
  await MentorMessage.create([
    { user: req.user.id, role: 'user', content: message },
    { user: req.user.id, role: 'assistant', content: replyText },
  ]);

  res.status(200).json({ success: true, reply: replyText });
});



const getMentorHistory = asyncHandler(async (req, res) => {
  const messages = await MentorMessage.find({ user: req.user.id })
    .sort({ createdAt: 1 })
    .limit(100);

  res.status(200).json({ success: true, messages });
});



const clearMentorHistory = asyncHandler(async (req, res) => {
  await MentorMessage.deleteMany({ user: req.user.id });
  res.status(200).json({ success: true, message: 'Mentor history cleared' });
});

module.exports = { chatWithMentor, getMentorHistory, clearMentorHistory };
