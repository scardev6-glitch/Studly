const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  steps: [{
    type: { 
      type: String, 
      enum: ['video', 'notes', 'exercise', 'analysis', 'review'], 
      required: true 
    },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    contentId: mongoose.Schema.Types.ObjectId
  }],
  currentStepIndex: { type: Number, default: 0 },
  isReviewRequired: { type: Boolean, default: false },
  isFocusMode: { type: Boolean, default: false },
  focusViolations: { type: Number, default: 0 },
  sessionTimer: { type: Number }, // Expected duration in minutes
  startedAt: { type: Date, default: Date.now },
  completedAt: Date
});

module.exports = mongoose.model('StudySession', studySessionSchema);
