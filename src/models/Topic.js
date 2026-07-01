const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    enum: ['Mathematics', 'Additional Mathematics', 'Biology', 'Chemistry', 'Physics', 'ICT', 'Siswati']
  },
  name: { type: String, required: true },
  description: String,
  subTopics: [{
    name: String,
    description: String,
    order: Number
  }]
});

module.exports = mongoose.model('Topic', topicSchema);
