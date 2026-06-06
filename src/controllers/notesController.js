const Note = require('../models/Note');
const aiEngine = require('../services/aiEngine');

async function createNote(req, res) {
  try {
    const userId = req.user.id;
    const { topicId, content } = req.body;

    // Auto-generate summary using AI
    const summary = await aiEngine.summarizeNotes(content);

    const note = new Note({
      userId,
      topicId,
      content,
      summary
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserNotes(req, res) {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ userId }).populate('topicId');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createNote,
  getUserNotes
};
