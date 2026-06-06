const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, progressController.getOverallStats);
router.get('/topics', protect, progressController.getTopicProgress);
router.get('/subjects', protect, progressController.getSubjectProgress);
router.get('/game', protect, progressController.getGameStats);

module.exports = router;
