const mongoose = require('mongoose');

const providedNoteSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    default: 'application/pdf'
  },
  size: {
    type: Number,
    required: true
  },
  sourceDir: {
    type: String,
    enum: ['NOTES', 'notes'],
    default: 'NOTES'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

providedNoteSchema.index({ subject: 1 });
providedNoteSchema.index({ filename: 1 });

module.exports = mongoose.model('ProvidedNote', providedNoteSchema);
