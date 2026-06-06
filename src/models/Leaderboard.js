const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  totalXp: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  currentStreak: { type: Number, default: 0 },
  topicsCompleted: { type: Number, default: 0 },
  quizzesPassed: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

leaderboardSchema.index({ totalXp: -1 });
leaderboardSchema.index({ points: -1 });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
