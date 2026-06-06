const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');
const { protect } = require('../middleware/authMiddleware');

router.get('/subjects', protect, syllabusController.getSubjects);
router.get('/search', protect, syllabusController.searchSyllabus);
router.post('/recommendations', protect, syllabusController.getRecommendations);
router.get('/:subject', protect, syllabusController.getSubjectBreakdown);
router.get('/:subject/:topic', protect, syllabusController.getTopicBreakdown);

module.exports = router;
