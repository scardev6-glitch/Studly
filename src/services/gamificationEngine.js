const User = require('../models/User');

/**
 * LEVEL THRESHOLDS
 * Level N requires N * 100 XP accumulated from previous levels.
 * Cumulative XP for level N = sum of (i * 100) for i = 1 to N-1
 * Example: Level 3 requires 100 + 200 = 300 cumulative XP
 */
function calcLevel(totalXp) {
  if (totalXp < 100) return 1;
  if (totalXp < 300) return 2;
  if (totalXp < 600) return 3;
  if (totalXp < 1000) return 4;
  if (totalXp < 1500) return 5;
  if (totalXp < 2100) return 6;
  if (totalXp < 2800) return 7;
  if (totalXp < 3600) return 8;
  if (totalXp < 4500) return 9;
  if (totalXp < 5500) return 10;
  if (totalXp < 6600) return 11;
  if (totalXp < 7800) return 12;
  if (totalXp < 9100) return 13;
  if (totalXp < 10500) return 14;
  if (totalXp < 12000) return 15;
  if (totalXp < 13600) return 16;
  if (totalXp < 15300) return 17;
  if (totalXp < 17100) return 18;
  if (totalXp < 19000) return 19;
  return Math.floor(totalXp / 1000) + 10;
}

/**
 * AI CREDITS SYSTEM
 * Every 50 XP earned grants 1 AI credit (auto-refill)
 * Credits cap at 50 maximum
 */
const XP_PER_CREDIT = 50;
const MAX_AI_CREDITS = 50;
const INITIAL_AI_CREDITS = 5;

/**
 * Calculates how many AI credits should be granted based on XP change.
 */
function calculateCreditRefill(oldXp, newXp) {
  const oldCreditsEarned = Math.floor(oldXp / XP_PER_CREDIT);
  const newCreditsEarned = Math.floor(newXp / XP_PER_CREDIT);
  return newCreditsEarned - oldCreditsEarned;
}

/**
 * Updates user points, XP, level, and AI credits based on activity.
 * This is the single source of truth for all gamification operations.
 */
async function recordActivity(userId) {
  const user = await User.findById(userId);
  if (!user) return;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  if (!user.lastActivityDate) {
    user.currentStreak = 1;
    user.points += 50; // Welcome points
  } else {
    const lastActivity = new Date(user.lastActivityDate.getFullYear(), user.lastActivityDate.getMonth(), user.lastActivityDate.getDate());
    const diffTime = Math.abs(today - lastActivity);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.currentStreak += 1;
      user.points += 100; // Daily streak bonus
    } else if (diffDays > 1) {
      user.currentStreak = 1;
      user.points += 50;
    }
  }

  if (user.currentStreak > user.longestStreak) {
    user.longestStreak = user.currentStreak;
  }

  user.lastActivityDate = now;
  await user.save();
  return user;
}

/**
 * Grants XP, recalculates level, and auto-refills AI credits.
 * Returns the full delta so the caller can show notifications.
 */
async function awardXp(userId, amount, reason) {
  if (!amount || amount < 1) return null;
  const user = await User.findById(userId);
  if (!user) return null;

  const oldXp = user.totalXp || 0;
  const oldLevel = user.gamificationLevel || 1;
  const oldCredits = user.aiCredits || 0;

  user.totalXp = oldXp + amount;
  user.gamificationLevel = calcLevel(user.totalXp);
  user.points = (user.points || 0) + Math.round(amount * 0.5); // 0.5 points per XP

  // Auto-refill AI credits based on XP milestone
  const creditsToAdd = calculateCreditRefill(oldXp, user.totalXp);
  if (creditsToAdd > 0) {
    user.aiCredits = Math.min(MAX_AI_CREDITS, (user.aiCredits || 0) + creditsToAdd);
  }

  await user.save();

  return {
    xpGained: amount,
    pointsGained: Math.round(amount * 0.5),
    oldXp,
    newXp: user.totalXp,
    oldLevel,
    newLevel: user.gamificationLevel,
    leveledUp: user.gamificationLevel > oldLevel,
    creditsAdded: user.aiCredits - oldCredits,
    newCredits: user.aiCredits
  };
}

/**
 * Grants points for specific achievements (keeps XP/level/credits in sync).
 */
async function awardPoints(userId, amount, reason) {
  const user = await User.findById(userId);
  if (!user) return;

  user.points += amount;
  // Every 10 points = 1 bonus XP, to keep game loop tight
  const bonusXp = Math.floor(amount / 10);
  if (bonusXp > 0) {
    const creditsToAdd = calculateCreditRefill(user.totalXp, user.totalXp + bonusXp);
    user.totalXp += bonusXp;
    user.gamificationLevel = calcLevel(user.totalXp);
    if (creditsToAdd > 0) {
      user.aiCredits = Math.min(MAX_AI_CREDITS, (user.aiCredits || 0) + creditsToAdd);
    }
  }

  await user.save();
  return user;
}

/**
 * Deducts points (for focus abandonment, etc.)
 * Does NOT reduce XP or level once earned (no negative XP).
 */
async function deductPoints(userId, amount, reason) {
  const user = await User.findById(userId);
  if (!user) return null;

  const oldPoints = user.points || 0;
  user.points = Math.max(0, oldPoints - amount);

  await user.save();
  return {
    pointsDeducted: amount,
    newPoints: user.points
  };
}

/**
 * Get current user progress snapshot for frontend.
 */
async function getProgressSnapshot(userId) {
  const user = await User.findById(userId);
  if (!user) {
    return {
      level: 1, totalXp: 0, aiCredits: INITIAL_AI_CREDITS,
      points: 0, currentStreak: 0, longestStreak: 0
    };
  }

  return {
    level: user.gamificationLevel || 1,
    totalXp: user.totalXp || 0,
    aiCredits: user.aiCredits || INITIAL_AI_CREDITS,
    points: user.points || 0,
    currentStreak: user.currentStreak || 0,
    longestStreak: user.longestStreak || 0,
    nextLevelXp: (user.gamificationLevel || 1) * 100,
    cumulativeXp: getCumulativeXp(user.gamificationLevel || 1)
  };
}

function getCumulativeXp(level) {
  let total = 0;
  for (let i = 1; i < level; i++) total += i * 100;
  return total;
}

module.exports = {
  recordActivity,
  awardPoints,
  awardXp,
  deductPoints,
  calcLevel,
  getProgressSnapshot,
  XP_PER_CREDIT,
  MAX_AI_CREDITS,
  INITIAL_AI_CREDITS
};
