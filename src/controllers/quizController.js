const quizEngine = require("../services/quizEngine");
const progressEngine = require("../services/progressEngine");
const reviewEngine = require("../services/reviewEngine");
const aiEngine = require("../services/aiEngine");
const gamificationEngine = require("../services/gamificationEngine");
const StudySession = require("../models/StudySession");

async function getQuiz(req, res) {
  try {
    const { sessionId } = req.params;
    const session = await StudySession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const questions = await quizEngine.generateQuiz(
      req.user.id,
      session.topicId,
    );
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function submitQuiz(req, res) {
  try {
    const { sessionId, userAnswers } = req.body;
    const userId = req.user.id;

    const session = await StudySession.findById(sessionId).populate("topicId");
    if (!session) return res.status(404).json({ message: "Session not found" });

    const questions = await quizEngine.generateQuiz(
      userId,
      session.topicId._id,
    );
    const results = quizEngine.evaluateAnswers(questions, userAnswers);

    // AI Integration: Generate custom explanations for mistakes
    for (const attempt of results.analysis) {
      if (!attempt.isCorrect) {
        const questionObj = questions.find(
          (q) => q._id.toString() === attempt.questionId.toString(),
        );
        attempt.aiExplanation = await aiEngine.generateExplanation(
          questionObj,
          attempt.userAnswer,
          attempt.correctAnswer,
        );
      } else {
        // Award XP + AI credits for correct answers
        await gamificationEngine.awardXp(
          userId,
          10,
          `Correct answer in ${session.topicId.name}`,
        );
      }
    }

    const progress = await progressEngine.updateMastery(
      userId,
      session.topicId._id,
      results,
    );

    // 4. Identify Weak Areas
    const reviewData = reviewEngine.identifyWeakAreas(results.analysis);

    // 5. Update Session State
    session.steps[session.currentStepIndex].status = "completed";
    session.currentStepIndex += 1;

    // Check if review is needed (add null check for results)
    if (results && results.percentage && results.percentage < 80) {
      session.isReviewRequired = true;
      if (!session.steps.find((s) => s.type === "review")) {
        session.steps.push({ type: "review", status: "pending" });
      }
    }

    if (session.currentStepIndex >= session.steps.length) {
      session.completedAt = new Date();
      // Update streak and give completion bonus with XP + AI credits
      await gamificationEngine.recordActivity(userId);
      await gamificationEngine.awardXp(userId, 50, "Session completion bonus");
    }

    await session.save();

    res.json({
      results,
      progress,
      reviewData,
      nextStep: session.steps[session.currentStepIndex],
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getQuiz,
  submitQuiz,
};
