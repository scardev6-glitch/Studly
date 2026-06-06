const StudySession = require('../models/StudySession');
const Video = require('../models/Video');
const Note = require('../models/Note');
const { findVideoForTopic, findPdfForTopic } = require('./videoMapper');

const STEP_TYPES = {
  VIDEO: 'video',
  NOTES: 'notes',
  EXERCISE: 'exercise',
  ANALYSIS: 'analysis',
  REVIEW: 'review'
};

async function startSession(userId, topicId) {
  let video = await Video.findOne({ topicId });

  // If no video in DB, try to find a local video by topic name
  if (!video) {
    const Topic = require('../models/Topic');
    const topic = await Topic.findById(topicId);
    if (topic) {
      const localVideo = findVideoForTopic(topic.name);
      if (localVideo) {
        video = { _id: null, title: localVideo.title, url: localVideo.path, duration: localVideo.duration };
      }
    }
  }

  const note = await Note.findOne({ topicId });

  const steps = [
    { type: STEP_TYPES.VIDEO, contentId: video?._id },
    { type: STEP_TYPES.NOTES, contentId: note?._id },
    { type: STEP_TYPES.EXERCISE },
    { type: STEP_TYPES.ANALYSIS }
  ];

  const session = new StudySession({
    userId,
    topicId,
    steps,
    currentStepIndex: 0
  });

  await session.save();
  return session;
}

async function getNextStep(sessionId) {
  const session = await StudySession.findById(sessionId).populate('topicId');
  if (!session) throw new Error('Session not found');

  const step = session.steps[session.currentStepIndex];
  if (!step) return { status: 'completed' };

  let content = null;
  if (step.type === STEP_TYPES.VIDEO) {
    content = await Video.findById(step.contentId);
    // Fallback to local video if no DB video
    if (!content && session.topicId) {
      const localVideo = findVideoForTopic(session.topicId.name);
      if (localVideo) {
        content = { title: localVideo.title, url: localVideo.path, duration: localVideo.duration };
      }
    }
  } else if (step.type === STEP_TYPES.NOTES) {
    content = await Note.findById(step.contentId);
    // Attach PDF resource if available
    if (session.topicId) {
      const pdfPath = findPdfForTopic(session.topicId.name);
      if (pdfPath) {
        content = { ...content, pdfResource: pdfPath };
      }
    }
  }

  return {
    step,
    currentStepIndex: session.currentStepIndex,
    totalSteps: session.steps.length,
    topic: session.topicId,
    content
  };
}

async function moveToNextStep(sessionId, quizScore = null) {
  const session = await StudySession.findById(sessionId);
  if (!session) throw new Error('Session not found');

  // If currently at Exercise/Analysis, we might have a score
  if (session.steps[session.currentStepIndex].type === STEP_TYPES.ANALYSIS && quizScore !== null) {
    if (quizScore < 80) {
      session.isReviewRequired = true;
      // Only add review step if it doesn't exist
      if (!session.steps.find(s => s.type === STEP_TYPES.REVIEW)) {
        session.steps.push({ type: STEP_TYPES.REVIEW, status: 'pending' });
      }
    }
  }

  session.steps[session.currentStepIndex].status = 'completed';
  session.currentStepIndex += 1;
  
  if (session.currentStepIndex >= session.steps.length) {
    session.completedAt = new Date();
  }

  await session.save();
  return session;
}

module.exports = {
  startSession,
  getNextStep,
  moveToNextStep,
  STEP_TYPES
};
