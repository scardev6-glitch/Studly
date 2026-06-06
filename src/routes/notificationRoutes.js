const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, notificationController.getNotifications);
router.get('/unread-count', protect, notificationController.getUnreadCount);
router.patch('/:id/read', protect, notificationController.markAsRead);
router.delete('/:id', protect, notificationController.deleteNotification);

module.exports = router;
