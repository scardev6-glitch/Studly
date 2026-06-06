const User = require('../models/User');

async function getLeaderboard(req, res) {
  try {
    const { period = 'all', limit = 20 } = req.query;

    let sortField = { totalXp: -1 };
    let matchQuery = {};

    // Filter by time period if needed
    if (period === 'weekly') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchQuery.lastActivityDate = { $gte: weekAgo };
    } else if (period === 'monthly') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchQuery.lastActivityDate = { $gte: monthAgo };
    }

    const leaders = await User.find(matchQuery)
      .select('fullname email totalXp points gamificationLevel currentStreak subjects')
      .sort(sortField)
      .limit(parseInt(limit))
      .lean();

    const result = leaders.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      totalXp: user.totalXp || 0,
      points: user.points || 0,
      level: user.gamificationLevel || 1,
      streak: user.currentStreak || 0,
      subjects: (user.subjects || []).slice(0, 3)
    }));

    // Also try to get current user's rank
    let currentUserRank = null;
    if (req.user && req.user.id) {
      try {
        const currentUser = await User.findById(req.user.id);
        if (currentUser) {
          const higherRanked = await User.countDocuments({
            ...matchQuery,
            totalXp: { $gt: currentUser.totalXp || 0 }
          });
          currentUserRank = higherRanked + 1;
        }
      } catch (e) { /* ignore */ }
    }

    res.json({ leaderboard: result, currentUserRank, totalParticipants: result.length });
  } catch (error) {
    // Return empty leaderboard on error
    res.json({ leaderboard: [], currentUserRank: null, totalParticipants: 0 });
  }
}

async function getUserRank(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.json({ rank: null });

    const higherRanked = await User.countDocuments({
      totalXp: { $gt: user.totalXp || 0 }
    });

    res.json({ rank: higherRanked + 1, totalXp: user.totalXp || 0, level: user.gamificationLevel || 1 });
  } catch (error) {
    res.json({ rank: null });
  }
}

module.exports = { getLeaderboard, getUserRank };
