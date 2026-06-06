const Note = require("../models/Note");
const aiEngine = require("../services/aiEngine");

async function createNote(req, res) {
  try {
    const userId = req.user.id;
    const { topicId, content } = req.body;

    if (!topicId || !content) {
      return res
        .status(400)
        .json({ message: "Topic ID and content are required" });
    }

    // Create note first to ensure data persistence
    const note = new Note({
      userId,
      topicId,
      content,
    });
    await note.save();

    // Generate summary asynchronously after save (non-blocking)
    aiEngine
      .summarizeNotes(content)
      .then((summary) => {
        note.summary = summary;
        return note.save();
      })
      .catch((err) => console.error("Error updating note summary:", err));

    res.status(201).json(note);
  } catch (error) {
    console.error("createNote Error:", error);
    res.status(500).json({ message: "Error creating note" });
  }
}

async function getUserNotes(req, res) {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ userId }).populate("topicId");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createNote,
  getUserNotes,
};
