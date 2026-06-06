const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  studySessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudySession' },
  durationMinutes: { type: Number, required: true },
  elapsedSeconds: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active'
  },
  xpEarned: { type: Number, default: 0 },
  pointsEarned: { type: Number, default: 0 },
  pointsPenalty: { type: Number, default: 0 },
  violations: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('FocusSession', focusSessionSchema);
