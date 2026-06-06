const studyEngine = require('../services/studyEngine');
const reminderEngine = require('../services/reminderEngine');
const StudySession = require('../models/StudySession');

const Topic = require('../models/Topic');

async function listTopics(req, res) {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function start(req, res) {
  try {
    const userId = req.user.id;
    const { topicId } = req.body;

    if (!topicId) {
      return res.status(400).json({ message: 'Topic ID is required' });
    }

    const session = await studyEngine.startSession(userId, topicId);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getNext(req, res) {
  try {
    const { sessionId } = req.params;
    const nextStep = await studyEngine.getNextStep(sessionId);
    res.json(nextStep);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function complete(req, res) {
  try {
    const { sessionId } = req.params;
    const { quizScore } = req.body;
    const session = await studyEngine.moveToNextStep(sessionId, quizScore);

    // Notify if session just completed
    const updated = await StudySession.findById(sessionId).populate('topicId');
    if (updated && updated.completedAt && updated.currentStepIndex >= updated.steps.length) {
      const topicName = updated.topicId?.name || 'a topic';
      await reminderEngine.createAchievementNotification(
        req.user.id,
        `${topicName} Complete!`,
        `You finished the full study pipeline for ${topicName}. Great work!`,
        '/study'
      );
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  listTopics,
  start,
  getNext,
  complete
};
