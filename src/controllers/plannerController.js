const plannerEngine = require('../services/plannerEngine');
const StudyPlan = require('../models/StudyPlan');
const UserProgress = require('../models/UserProgress');

/**
 * CREATE: Generate a new study plan
 */
async function createPlan(req, res) {
  try {
    const userId = req.user.id;
    const { availableTime } = req.body;

    if (!availableTime || availableTime < 10) {
      return res.status(400).json({ message: 'Available time must be at least 10 minutes' });
    }

    if (availableTime > 480) {
      return res.status(400).json({ message: 'Available time cannot exceed 8 hours' });
    }

    try {
      const plan = await plannerEngine.generateDailyPlan(userId, availableTime);
      return res.status(201).json(plan);
    } catch (engineError) {
      // Fallback: generate a mock plan when MongoDB is offline
      if (process.env.AUTH_DISABLED === 'true') {
        const mockTopics = [
          { name: 'Algebra', subject: 'Mathematics' },
          { name: 'Cell Biology', subject: 'Biology' },
          { name: 'Atomic Structure', subject: 'Chemistry' },
          { name: 'Grammar', subject: 'English Language' },
          { name: 'Networks', subject: 'ICT' }
        ];
        const sessionDuration = 25;
        const maxSessions = Math.floor(availableTime / (sessionDuration + 5));
        const goals = mockTopics.slice(0, Math.min(maxSessions, 4)).map((t, i) => ({
          _id: 'mock-goal-' + i,
          subject: t.subject,
          topicId: { name: t.name },
          duration: sessionDuration,
          actualDuration: 0,
          priority: 'medium',
          status: 'pending'
        }));
        const plan = {
          _id: 'mock-plan-' + Date.now(),
          userId,
          date: new Date(),
          availableTime,
          dailyGoals: goals,
          reminders: [{ time: '09:00', enabled: true, type: 'session-start' }],
          title: 'Daily Study Plan',
          priority: 'medium',
          stats: { startTime: new Date() }
        };
        return res.status(201).json(plan);
      }
      throw engineError;
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * READ: Get today's plan
 */
async function getTodayPlan(req, res) {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const plan = await StudyPlan.findOne({ userId, date: today })
        .populate('dailyGoals.topicId');
      
      if (!plan) {
        return res.status(404).json({ message: 'No plan found for today' });
      }
      return res.json(plan);
    } catch (dbError) {
      if (process.env.AUTH_DISABLED === 'true') {
        return res.status(404).json({ message: 'No plan found for today' });
      }
      throw dbError;
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * READ: Get single plan by ID
 */
async function getPlanById(req, res) {
  try {
    const userId = req.user.id;
    const { planId } = req.params;

    const plan = await StudyPlan.findOne({ _id: planId, userId })
      .populate('dailyGoals.topicId');
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * READ: Get all user plans
 */
async function getAllPlans(req, res) {
  try {
    const userId = req.user.id;
    const { skip = 0, limit = 20, status } = req.query;

    const query = { userId };
    if (status) query['dailyGoals.status'] = status;

    const plans = await StudyPlan.find(query)
      .populate('dailyGoals.topicId')
      .sort({ date: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const total = await StudyPlan.countDocuments(query);

    res.json({ plans, total, count: plans.length });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * READ: Get weekly overview
 */
async function getWeeklyPlan(req, res) {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const plans = await StudyPlan.find({
      userId,
      date: { $gte: startOfWeek, $lte: endOfWeek }
    }).populate('dailyGoals.topicId');

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * READ: Get monthly overview
 */
async function getMonthlyPlan(req, res) {
  try {
    const userId = req.user.id;
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const plans = await StudyPlan.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    }).populate('dailyGoals.topicId');

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * UPDATE: Update entire plan
 */
async function updatePlan(req, res) {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    const { title, notes, priority, tags, reminders } = req.body;

    const plan = await StudyPlan.findOneAndUpdate(
      { _id: planId, userId },
      {
        title,
        notes,
        priority,
        tags,
        reminders,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('dailyGoals.topicId');

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PATCH: Update specific goal in plan
 */
async function updateGoal(req, res) {
  try {
    const userId = req.user.id;
    const { planId, goalId } = req.params;
    const { status, actualDuration, notes, priority } = req.body;

    const plan = await StudyPlan.findOne({ _id: planId, userId });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const goal = plan.dailyGoals.id(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (status) goal.status = status;
    if (actualDuration) goal.actualDuration = actualDuration;
    if (notes) goal.notes = notes;
    if (priority) goal.priority = priority;

    // Track goal completion
    if (status === 'completed') {
      goal.sessionEndTime = new Date();
      plan.stats.sessionsCompleted = (plan.stats.sessionsCompleted || 0) + 1;
    }

    if (status === 'skipped') {
      plan.stats.sessionsSkipped = (plan.stats.sessionsSkipped || 0) + 1;
      plan.skippedGoals.push(goalId);
    }

    await plan.save();

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * PATCH: Start/stop timer for goal
 */
async function updateTimer(req, res) {
  try {
    const userId = req.user.id;
    const { planId, goalId } = req.params;
    const { action } = req.body; // 'start', 'stop', 'pause'

    const plan = await StudyPlan.findOne({ _id: planId, userId });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const goal = plan.dailyGoals.id(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (action === 'start') {
      goal.status = 'in-progress';
      goal.sessionStartTime = new Date();
    } else if (action === 'stop' || action === 'pause') {
      goal.status = 'paused';
      if (goal.sessionStartTime) {
        const elapsed = new Date() - goal.sessionStartTime;
        goal.actualDuration = Math.round(elapsed / 60000); // Convert to minutes
      }
    }

    await plan.save();

    res.json({ goal, message: `Timer ${action} successful` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * DELETE: Delete entire plan
 */
async function deletePlan(req, res) {
  try {
    const userId = req.user.id;
    const { planId } = req.params;

    const plan = await StudyPlan.findOneAndDelete({ _id: planId, userId });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * DELETE: Remove specific goal from plan
 */
async function deleteGoal(req, res) {
  try {
    const userId = req.user.id;
    const { planId, goalId } = req.params;

    const plan = await StudyPlan.findOne({ _id: planId, userId });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    plan.dailyGoals.id(goalId).deleteOne();
    await plan.save();

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * GET: Statistics for user's planning
 */
async function getStatistics(req, res) {
  try {
    const userId = req.user.id;
    const { days = 30 } = req.query;

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - parseInt(days));
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date();
    toDate.setHours(23, 59, 59, 999);

    const stats = await plannerEngine.getStatistics(userId, fromDate, toDate);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * POST: Add goal to existing plan
 */
async function addGoal(req, res) {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    const { subject, topicId, duration, priority } = req.body;

    const plan = await StudyPlan.findOne({ _id: planId, userId });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const goalId = new (require('mongoose')).Types.ObjectId();
    plan.dailyGoals.push({
      _id: goalId,
      subject,
      topicId,
      duration: duration || 25,
      priority: priority || 'medium',
      status: 'pending'
    });

    await plan.save();

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createPlan,
  getTodayPlan,
  getPlanById,
  getAllPlans,
  getWeeklyPlan,
  getMonthlyPlan,
  updatePlan,
  updateGoal,
  updateTimer,
  deletePlan,
  deleteGoal,
  getStatistics,
  addGoal
};
