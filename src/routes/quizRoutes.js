const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:sessionId', protect, quizController.getQuiz);
router.post('/submit', protect, quizController.submitQuiz);

module.exports = router;
