const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;

const getGeminiModel = (systemInstruction) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in .env - AI Mentor cannot respond until it is configured');
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  return genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    systemInstruction,
  });
};

module.exports = { getGeminiModel };
