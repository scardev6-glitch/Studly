const Question = require('../models/Question');
const aiEngine = require('./aiEngine');
const UserProgress = require('../models/UserProgress');

/**
 * Generates a quiz for a specific topic.
 * Prioritizes AI-generated questions for weak areas.
 */
async function generateQuiz(userId, topicId, limit = 5) {
  // 1. Check for weak areas in progress
  const progress = await UserProgress.findOne({ userId, topicId }).populate('topicId');
  
  if (progress && progress.weakSubTopics && progress.weakSubTopics.length > 0) {
    const aiQuestions = await aiEngine.generateQuestions(progress.topicId.name, progress.weakSubTopics);
    if (aiQuestions) {
      // Mix with some database questions
      const dbQuestions = await Question.aggregate([
        { $match: { topicId: new (require('mongoose').Types.ObjectId)(topicId) } },
        { $sample: { size: Math.max(0, limit - aiQuestions.length) } }
      ]);
      return [...aiQuestions, ...dbQuestions];
    }
  }

  // Fallback to standard random selection
  const questions = await Question.aggregate([
    { $match: { topicId: new (require('mongoose').Types.ObjectId)(topicId) } },
    { $sample: { size: limit } }
  ]);

  return questions;
}

/**
 * Evaluates quiz answers and identifies weak points.
 */
function evaluateAnswers(questions, userAnswers) {
  let score = 0;
  const analysis = [];

  questions.forEach((q, index) => {
    const isCorrect = q.correctAnswer === userAnswers[index];
    if (isCorrect) score++;

    analysis.push({
      questionId: q._id,
      subTopic: q.subTopic,
      isCorrect,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswers[index],
      explanation: q.explanation
    });
  });

  return {
    score,
    total: questions.length,
    percentage: (score / questions.length) * 100,
    analysis
  };
}

module.exports = {
  generateQuiz,
  evaluateAnswers
};
