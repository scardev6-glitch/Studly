/**
 * Logic for detecting and acting on weak points.
 */
function identifyWeakAreas(quizAnalysis) {
  const weakAreas = quizAnalysis
    .filter(a => !a.isCorrect)
    .map(a => ({
      subTopic: a.subTopic,
      questionId: a.questionId,
      explanation: a.explanation
    }));

  return {
    needsReview: weakAreas.length > 0,
    weakAreas,
    recommendation: weakAreas.length > 2 
      ? "Focus on these specific sub-topics before proceeding to new lessons."
      : "Minor mistakes detected. Quick review recommended."
  };
}

module.exports = {
  identifyWeakAreas
};
