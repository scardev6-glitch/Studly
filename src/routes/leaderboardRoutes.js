const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, leaderboardController.getLeaderboard);
router.get('/me', protect, leaderboardController.getUserRank);

module.exports = router;
