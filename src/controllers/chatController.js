const CommunityMessage = require('../models/CommunityMessage');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function getMessages(req, res) {
  try {
    const messages = await CommunityMessage.find()
      .populate('userId', 'fullname email')
      .populate('replies.userId', 'fullname')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(messages.reverse());
  } catch (error) {
    console.error('getMessages Error:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
}

async function createMessage(req, res) {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }
    const msg = new CommunityMessage({
      userId: req.user.id,
      username: req.user.fullname || 'Anonymous',
      message: message.trim()
    });
    await msg.save();
    const populated = await CommunityMessage.findById(msg._id)
      .populate('userId', 'fullname email');
    res.status(201).json(populated);
  } catch (error) {
    console.error('createMessage Error:', error);
    res.status(500).json({ message: 'Error posting message' });
  }
}

async function likeMessage(req, res) {
  try {
    const msg = await CommunityMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    const idx = msg.likes.indexOf(req.user.id);
    if (idx > -1) {
      msg.likes.splice(idx, 1);
    } else {
      msg.likes.push(req.user.id);
    }
    await msg.save();
    res.json({ likes: msg.likes.length });
  } catch (error) {
    console.error('likeMessage Error:', error);
    res.status(500).json({ message: 'Error updating like' });
  }
}

async function replyToMessage(req, res) {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Reply cannot be empty' });
    }
    const msg = await CommunityMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    msg.replies.push({
      userId: req.user.id,
      username: req.user.fullname || 'Anonymous',
      message: message.trim()
    });
    await msg.save();
    const populated = await CommunityMessage.findById(msg._id)
      .populate('userId', 'fullname email')
      .populate('replies.userId', 'fullname');
    res.json(populated);
  } catch (error) {
    console.error('replyToMessage Error:', error);
    res.status(500).json({ message: 'Error posting reply' });
  }
}

async function deleteMessage(req, res) {
  try {
    const msg = await CommunityMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    if (msg.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await CommunityMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('deleteMessage Error:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
}

async function askAI(req, res) {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Please enter a question' });
    }

    // Check AI credits
    let user = null;
    try { user = await User.findById(req.user.id); } catch (e) { /* offline */ }
    const credits = user?.aiCredits ?? 0;
    if (credits < 1) {
      return res.json({
        outOfCredits: true,
        answer: '<p><strong>You\'ve run out of AI credits!</strong></p><p>Study more to earn points and refill your credits. Complete focus sessions, quizzes, and study sessions to earn XP and AI credits.</p><div style="margin-top:12px;padding:12px;background:var(--primary-bg);border-radius:var(--radius-sm);text-align:center"><p style="font-weight:600;color:var(--primary)">Study to earn 1 AI credit per 50 XP earned</p></div>'
      });
    }

    // Deduct one credit
    if (user) {
      user.aiCredits = Math.max(0, credits - 1);
      await user.save();
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        answer: '<p><strong>AI Tutor is not available right now.</strong></p><p>Please check back later or contact support if this persists.</p>',
        creditsRemaining: user?.aiCredits ?? 0
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an AI tutor for EGCSE Eswatini students. Answer the following question in a clear, helpful way. Use markdown formatting (headings, bold, lists) to structure your response. Be concise but thorough.

Student question: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const formatted = text
      .replace(/^###?\s(.+)$/gm, '<h4>$1</h4>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    res.json({ answer: `<p>${formatted}</p>`, creditsRemaining: user?.aiCredits ?? 0 });
  } catch (error) {
    console.error('AI Tutor Error:', error);
    res.json({
      answer: '<p><strong>Sorry, I encountered an error.</strong></p><p>The AI service is temporarily unavailable. Please try again shortly.</p>'
    });
  }
}

module.exports = {
  getMessages,
  createMessage,
  likeMessage,
  replyToMessage,
  deleteMessage,
  askAI
};
