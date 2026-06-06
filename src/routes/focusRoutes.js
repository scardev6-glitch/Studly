const express = require('express');
const router = express.Router();
const focusController = require('../controllers/focusController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start', protect, focusController.startFocus);
router.post('/:sessionId/complete', protect, focusController.completeFocus);
router.post('/:sessionId/abandon', protect, focusController.abandonFocus);
router.post('/:sessionId/violation', protect, focusController.recordViolation);
router.get('/history', protect, focusController.getFocusHistory);
router.get('/status', protect, focusController.getFocusStatus);

module.exports = router;
