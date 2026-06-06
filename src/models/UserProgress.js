const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  masteryLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  totalAttempts: {
    type: Number,
    default: 0
  },
  correctAttempts: {
    type: Number,
    default: 0
  },
  mistakes: {
    type: Number,
    default: 0
  },
  weakSubTopics: [String],
  nextReviewDate: {
    type: Date,
    default: Date.now
  },
  lastReviewedAt: Date
});

// Compound index to ensure one progress record per user per topic
userProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
