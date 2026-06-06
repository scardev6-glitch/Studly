const mongoose = require('mongoose');

const communityMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  replies: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('CommunityMessage', communityMessageSchema);
