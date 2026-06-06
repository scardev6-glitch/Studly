const FocusSession = require('../models/FocusSession');
const User = require('../models/User');
const gamificationEngine = require('../services/gamificationEngine');

const XP_PER_MINUTE = 10;
const POINTS_PER_MINUTE = 5;
const ABANDON_PENALTY_POINTS = 20;
const ABANDON_PENALTY_XP = 50;
const VIOLATION_PENALTY_POINTS = 5;

async function startFocus(req, res) {
  try {
    const { durationMinutes, topicId, studySessionId } = req.body;
    if (!durationMinutes || durationMinutes < 1) {
      return res.status(400).json({ message: 'Duration must be at least 1 minute' });
    }
    if (durationMinutes > 120) {
      return res.status(400).json({ message: 'Max duration is 120 minutes' });
    }
    const session = await FocusSession.create({
      userId: req.user.id,
      topicId: topicId || undefined,
      studySessionId: studySessionId || undefined,
      durationMinutes
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function completeFocus(req, res) {
  try {
    const { sessionId } = req.params;
    const { elapsedSeconds } = req.body;

    const session = await FocusSession.findOne({ _id: sessionId, userId: req.user.id });
    if (!session) return res.status(404).json({ message: 'Focus session not found' });
    if (session.status !== 'active') return res.status(400).json({ message: 'Session already ended' });

    const elapsedMinutes = Math.max(1, Math.round((elapsedSeconds || 0) / 60));
    const totalMinutes = Math.min(elapsedMinutes, session.durationMinutes);

    session.elapsedSeconds = elapsedSeconds || totalMinutes * 60;
    session.status = 'completed';
    session.completedAt = new Date();

    const xpEarned = totalMinutes * XP_PER_MINUTE;
    const pointsEarned = totalMinutes * POINTS_PER_MINUTE;

    session.xpEarned = xpEarned;
    session.pointsEarned = pointsEarned;

    // Use unified gamification engine for XP/credits/level sync
    const result = await gamificationEngine.awardXp(req.user.id, xpEarned, 'Focus session completed');
    const user = await User.findById(req.user.id);
    user.points += pointsEarned;
    await user.save();
    await session.save();

    res.json({
      session,
      xpEarned,
      pointsEarned,
      newTotalXp: user.totalXp,
      newLevel: user.gamificationLevel,
      newPoints: user.points,
      creditsAdded: result?.creditsAdded || 0,
      newCredits: result?.newCredits || user.aiCredits || 0,
      leveledUp: result?.leveledUp || false
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function abandonFocus(req, res) {
  try {
    const { sessionId } = req.params;
    const { elapsedSeconds } = req.body;

    const session = await FocusSession.findOne({ _id: sessionId, userId: req.user.id });
    if (!session) return res.status(404).json({ message: 'Focus session not found' });
    if (session.status !== 'active') return res.status(400).json({ message: 'Session already ended' });

    session.elapsedSeconds = elapsedSeconds || 0;
    session.status = 'abandoned';
    session.completedAt = new Date();
    session.pointsPenalty = ABANDON_PENALTY_POINTS;

    const user = await User.findById(req.user.id);
    const oldXp = user.totalXp || 0;
    user.points = Math.max(0, user.points - ABANDON_PENALTY_POINTS);
    // XP penalty: reduce XP but never below 0 and never de-level
    user.totalXp = Math.max(0, oldXp - ABANDON_PENALTY_XP);
    const newLevel = gamificationEngine.calcLevel(user.totalXp);
    // Only de-level if the drop is significant (avoid oscillation)
    if (newLevel < user.gamificationLevel && (user.gamificationLevel - newLevel) <= 1) {
      user.gamificationLevel = Math.max(1, user.gamificationLevel - 1);
    }
    await user.save();
    await session.save();

    res.json({
      session,
      penaltyPoints: ABANDON_PENALTY_POINTS,
      penaltyXp: ABANDON_PENALTY_XP,
      newTotalXp: user.totalXp,
      newLevel: user.gamificationLevel,
      newPoints: user.points
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function recordViolation(req, res) {
  try {
    const { sessionId } = req.params;
    const session = await FocusSession.findOne({ _id: sessionId, userId: req.user.id });
    if (!session) return res.status(404).json({ message: 'Focus session not found' });

    session.violations += 1;

    const penalty = await gamificationEngine.deductPoints(req.user.id, VIOLATION_PENALTY_POINTS, 'Focus violation');
    await session.save();

    res.json({
      violations: session.violations,
      penaltyPoints: VIOLATION_PENALTY_POINTS,
      newPoints: penalty?.newPoints || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getFocusHistory(req, res) {
  try {
    const sessions = await FocusSession.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('topicId', 'name');
    res.json(sessions);
  } catch (error) {
    res.json([]);
  }
}

async function getFocusStatus(req, res) {
  try {
    const active = await FocusSession.findOne({ userId: req.user.id, status: 'active' });
    res.json({ hasActiveSession: !!active, session: active || null });
  } catch (error) {
    res.json({ hasActiveSession: false, session: null });
  }
}

module.exports = { startFocus, completeFocus, abandonFocus, recordViolation, getFocusHistory, getFocusStatus };
