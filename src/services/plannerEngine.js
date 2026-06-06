const StudyPlan = require('../models/StudyPlan');
const UserProgress = require('../models/UserProgress');
const Topic = require('../models/Topic');

/**
 * Generates an adaptive study plan using spaced repetition and intelligent scheduling
 */
async function generateDailyPlan(userId, availableTime) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // 1. Get user's progress to prioritize weak topics
    const progressList = await UserProgress.find({ userId })
      .sort({ masteryLevel: 1 }) // Weakest first
      .populate('topicId');

    if (!progressList || progressList.length === 0) {
      throw new Error('No topics found. User must have topics to plan.');
    }

    // 2. Calculate session parameters (Pomodoro: 25m focus + 5m break)
    const sessionDuration = 25;
    const breakDuration = 5;
    const maxSessions = Math.floor(availableTime / (sessionDuration + breakDuration));
    const numGoals = Math.min(maxSessions, progressList.length);

    // 3. Generate intelligent daily goals using spaced repetition
    const dailyGoals = [];
    let timeAllocated = 0;

    for (let i = 0; i < numGoals; i++) {
      const progress = progressList[i];
      const topic = progress.topicId;

      if (!topic) continue;

      // Determine priority based on mastery level
      let priority = 'low';
      if (progress.masteryLevel < 50) priority = 'high'; // Weak topics = high priority
      else if (progress.masteryLevel < 75) priority = 'medium';

      // Adjust duration based on difficulty and mastery
      let adjustedDuration = sessionDuration;
      if (progress.masteryLevel < 40) adjustedDuration = 30; // Weak topics get more time
      else if (progress.masteryLevel > 85) adjustedDuration = 20; // Strong topics get less time

      // Ensure we don't exceed available time
      if (timeAllocated + adjustedDuration > availableTime) {
        adjustedDuration = availableTime - timeAllocated;
        if (adjustedDuration < 10) continue; // Skip if less than 10 mins remaining
      }

      const goalId = new (require('mongoose')).Types.ObjectId();
      dailyGoals.push({
        _id: goalId,
        subject: topic.subject,
        topicId: topic._id,
        duration: adjustedDuration,
        actualDuration: 0,
        priority,
        difficulty: getDifficultyFromMastery(progress.masteryLevel),
        status: 'pending',
        tags: [topic.subject.toLowerCase().replace(/\s+/g, '-')]
      });

      timeAllocated += adjustedDuration;

      // Add break time (except after last session)
      if (i < numGoals - 1) {
        timeAllocated += breakDuration;
      }
    }

    // 4. Calculate reminders
    const reminders = [
      { time: '09:00', enabled: true, type: 'session-start' },
      { time: '14:00', enabled: true, type: 'session-start' },
      { time: '18:00', enabled: true, type: 'session-start' }
    ];

    // 5. Save or Update Plan
    let plan = await StudyPlan.findOne({ userId, date: today });

    if (plan) {
      plan.availableTime = availableTime;
      plan.dailyGoals = dailyGoals;
      plan.reminders = reminders;
      plan.stats.startTime = new Date();
    } else {
      plan = new StudyPlan({
        userId,
        date: today,
        availableTime,
        dailyGoals,
        reminders,
        title: 'Daily Study Plan',
        priority: 'medium',
        stats: { startTime: new Date() }
      });
    }

    await plan.save();
    return plan.toObject();
  } catch (error) {
    throw new Error(`Failed to generate plan: ${error.message}`);
  }
}

/**
 * Get difficulty from mastery level
 */
function getDifficultyFromMastery(masteryLevel) {
  if (masteryLevel < 40) return 'hard';
  if (masteryLevel < 75) return 'medium';
  return 'easy';
}

/**
 * Calculate optimal duration for a topic based on mastery and difficulty
 */
async function calculateOptimalDuration(topicId, currentMastery, baseTime = 25) {
  // Algorithm: weaker topics get more time, stronger topics less
  let multiplier = 1;

  if (currentMastery < 30) multiplier = 1.5;
  else if (currentMastery < 50) multiplier = 1.3;
  else if (currentMastery < 75) multiplier = 1;
  else multiplier = 0.8;

  return Math.round(baseTime * multiplier);
}

/**
 * Insert breaks into the plan automatically
 */
function insertBreaks(goals, breakDuration = 5) {
  const goalsWithBreaks = [];
  
  goals.forEach((goal, index) => {
    goalsWithBreaks.push(goal);
    
    // Add break after each goal except the last one
    if (index < goals.length - 1) {
      goalsWithBreaks.push({
        type: 'break',
        duration: breakDuration,
        status: 'pending',
        subject: `Break (${breakDuration}m)`
      });
    }
  });
  
  return goalsWithBreaks;
}

/**
 * Get detailed statistics for a user's planning
 */
async function getStatistics(userId, fromDate, toDate) {
  try {
    const plans = await StudyPlan.find({
      userId,
      date: { $gte: fromDate, $lte: toDate }
    });

    const stats = {
      totalPlans: plans.length,
      averageCompletion: 0,
      totalStudyTime: 0,
      averageEfficiency: 0,
      strongestTopics: [],
      weakestTopics: [],
      consistency: 0
    };

    if (plans.length === 0) return stats;

    let totalCompletion = 0;
    let totalEfficiency = 0;

    plans.forEach(plan => {
      stats.totalStudyTime += plan.totalActualTime || 0;
      totalCompletion += plan.completionRate || 0;
      totalEfficiency += plan.stats.efficiency || 0;
    });

    stats.averageCompletion = Math.round(totalCompletion / plans.length);
    stats.averageEfficiency = Math.round(totalEfficiency / plans.length);
    stats.consistency = Math.round((plans.length / getDaysInRange(fromDate, toDate)) * 100);

    return stats;
  } catch (error) {
    throw new Error(`Failed to get statistics: ${error.message}`);
  }
}

/**
 * Get days between two dates
 */
function getDaysInRange(fromDate, toDate) {
  const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Detect conflicting goals (overlapping times)
 */
function detectConflicts(goals) {
  const conflicts = [];
  
  for (let i = 0; i < goals.length; i++) {
    for (let j = i + 1; j < goals.length; j++) {
      if (goals[i].sessionStartTime && goals[j].sessionStartTime) {
        if (isTimeOverlap(goals[i], goals[j])) {
          conflicts.push({
            goal1: goals[i]._id,
            goal2: goals[j]._id,
            message: `Goals overlap: ${goals[i].subject} and ${goals[j].subject}`
          });
        }
      }
    }
  }
  
  return conflicts;
}

/**
 * Check if two time slots overlap
 */
function isTimeOverlap(goal1, goal2) {
  const end1 = new Date(goal1.sessionStartTime.getTime() + goal1.duration * 60000);
  const end2 = new Date(goal2.sessionStartTime.getTime() + goal2.duration * 60000);
  
  return goal1.sessionStartTime < end2 && goal2.sessionStartTime < end1;
}

module.exports = {
  generateDailyPlan,
  calculateOptimalDuration,
  insertBreaks,
  getStatistics,
  detectConflicts,
  getDifficultyFromMastery
};
