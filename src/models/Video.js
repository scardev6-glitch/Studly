const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  title: String,
  url: String,
  duration: Number
});

module.exports = mongoose.model('Video', videoSchema);
