const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number, // Index of the correct option
    required: true
  },
  explanation: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  subTopic: String // For granular weak point detection
});

module.exports = mongoose.model('Question', questionSchema);
