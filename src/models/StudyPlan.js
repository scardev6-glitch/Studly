const mongoose = require('mongoose');

const goalUpdateSchema = new mongoose.Schema({
  goalId: mongoose.Schema.Types.ObjectId,
  sessionStartTime: Date,
  sessionEndTime: Date,
  actualDuration: Number, // minutes
  status: String,
  notes: String
}, { _id: false });

const reminderSchema = new mongoose.Schema({
  time: String, // HH:MM format
  enabled: { type: Boolean, default: true },
  type: { type: String, enum: ['session-start', 'break', 'deadline'], default: 'session-start' }
}, { _id: false });

const studyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  availableTime: {
    type: Number, // in minutes
    required: true
  },
  title: {
    type: String,
    default: 'Daily Study Plan'
  },
  notes: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [String],
  reminders: [reminderSchema],
  recurring: {
    enabled: { type: Boolean, default: false },
    pattern: { type: String, enum: ['daily', 'weekly', 'custom'], default: 'daily' }
  },
  
  // Daily Goals - Enhanced
  dailyGoals: [{
    _id: mongoose.Schema.Types.ObjectId,
    subject: String,
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic'
    },
    duration: Number, // planned duration in minutes
    actualDuration: { type: Number, default: 0 }, // actual time spent
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'paused', 'completed', 'skipped'],
      default: 'pending'
    },
    sessionStartTime: Date,
    sessionEndTime: Date,
    notes: String,
    tags: [String]
  }],
  
  // Time tracking
  goalUpdates: [goalUpdateSchema],
  totalPlannedTime: { type: Number, default: 0 },
  totalActualTime: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 }, // percentage
  skippedGoals: [String],
  
  // Statistics
  stats: {
    startTime: Date,
    endTime: Date,
    sessionsCompleted: { type: Number, default: 0 },
    sessionsSkipped: { type: Number, default: 0 },
    averageSessionDuration: { type: Number, default: 0 },
    efficiency: { type: Number, default: 0 } // actual time / planned time
  }
}, { timestamps: true });

// Indexes for performance
studyPlanSchema.index({ userId: 1, date: 1 }, { unique: true });
studyPlanSchema.index({ userId: 1, createdAt: -1 });
studyPlanSchema.index({ userId: 1, 'dailyGoals.status': 1 });
studyPlanSchema.index({ userId: 1, priority: 1 });

// Calculate completion rate before saving
studyPlanSchema.pre('save', function(next) {
  if (this.dailyGoals.length === 0) {
    this.completionRate = 0;
  } else {
    const completed = this.dailyGoals.filter(g => g.status === 'completed').length;
    this.completionRate = Math.round((completed / this.dailyGoals.length) * 100);
  }
  
  // Calculate totals
  this.totalPlannedTime = this.dailyGoals.reduce((sum, g) => sum + (g.duration || 0), 0);
  this.totalActualTime = this.dailyGoals.reduce((sum, g) => sum + (g.actualDuration || 0), 0);
  
  if (this.totalPlannedTime > 0) {
    this.stats.efficiency = Math.round((this.totalActualTime / this.totalPlannedTime) * 100);
  }
  
  next();
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
