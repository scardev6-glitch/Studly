const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, chatController.getMessages);
router.post('/', protect, chatController.createMessage);
router.post('/ask', protect, chatController.askAI);
router.post('/:id/like', protect, chatController.likeMessage);
router.post('/:id/reply', protect, chatController.replyToMessage);
router.delete('/:id', protect, chatController.deleteMessage);

module.exports = router;
