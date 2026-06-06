const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/topics', protect, studyController.listTopics);
router.post('/start', protect, studyController.start);
router.get('/:sessionId/next', protect, studyController.getNext);
router.post('/:sessionId/complete', protect, studyController.complete);

module.exports = router;
