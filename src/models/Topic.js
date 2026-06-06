const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    enum: [
      'Mathematics', 'English Language', 'Siswati', 'Biology', 'Chemistry', 
      'Physics', 'Combined Science', 'Geography', 'History', 'Food and Nutrition', 
      'Accounting', 'Business Studies', 'Economics', 'Agriculture', 'ICT',
      'Religious Education', 'Literature in English', 'Design & Technology'
    ]
  },
  name: { type: String, required: true },
  description: String,
  level: { type: String, enum: ['EGCSE', 'JC'], required: true },
  subTopics: [{
    name: String,
    description: String,
    order: Number
  }]
});

module.exports = mongoose.model('Topic', topicSchema);
