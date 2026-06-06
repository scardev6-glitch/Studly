const UserProgress = require('../models/UserProgress');

/**
 * Updates mastery using a Spaced Repetition (SRS) inspired logic.
 */
async function updateMastery(userId, topicId, quizResult) {
  let progress = await UserProgress.findOne({ userId, topicId });

  if (!progress) {
    progress = new UserProgress({ userId, topicId });
  }

  const { percentage, analysis } = quizResult;

  // 1. Update overall mastery
  // Production Logic: Weighted average of current mastery and new performance
  const weight = 0.3; // How much the new quiz affects the total (30%)
  progress.masteryLevel = Math.round((progress.masteryLevel * (1 - weight)) + (percentage * weight));

  // 2. Track attempts and mistakes
  progress.totalAttempts += 1;
  const mistakesInThisQuiz = analysis.filter(a => !a.isCorrect).length;
  progress.mistakes += mistakesInThisQuiz;
  progress.correctAttempts += (analysis.length - mistakesInThisQuiz);

  // 3. Spaced Repetition Logic (Calculate Next Review)
  // Simple version: 
  // - Mastery < 50: 1 day
  // - Mastery 50-80: 3 days
  // - Mastery > 80: 7 days
  const daysToAdd = progress.masteryLevel < 50 ? 1 : progress.masteryLevel < 80 ? 3 : 7;
  progress.nextReviewDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);
  progress.lastReviewedAt = new Date();

  // 4. Update Weak Sub-Topics
  const newWeakPoints = analysis
    .filter(a => !a.isCorrect && a.subTopic)
    .map(a => a.subTopic);
  
  // Merge and deduplicate weak points
  progress.weakSubTopics = [...new Set([...progress.weakSubTopics, ...newWeakPoints])];

  await progress.save();
  return progress;
}

module.exports = {
  updateMastery
};
