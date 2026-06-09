const fs = require('fs');
const path = require('path');
const Note = require("../models/Note");
const ProvidedNote = require("../models/ProvidedNote");
const aiEngine = require("../services/aiEngine");

const ASSETS_DIR = path.join(__dirname, '..', '..', '..', 'assets');

async function createNote(req, res) {
  try {
    const userId = req.user.id;
    const { topicId, content } = req.body;

    if (!topicId || !content) {
      return res
        .status(400)
        .json({ message: "Topic ID and content are required" });
    }

    const note = new Note({
      userId,
      topicId,
      content,
    });
    await note.save();

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

function scanDir(dir, basePath = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results = results.concat(scanDir(fullPath, relPath));
    } else if (entry.name.endsWith('.pdf')) {
      results.push({ name: entry.name, relPath });
    }
  }
  return results;
}

function parseSubject(filename) {
  return filename
    .replace(/\.pdf$/i, '')
    .replace(/^CAIE\s*-\s*IGCSE\s*-\s*/i, '')
    .replace(/^caie-igcse-[\w-]+-\d+-[\w-]+-v\d+/i, (m) => {
      const parts = m.replace(/^caie-igcse-/i, '').split('-');
      return parts.slice(0, -2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    })
    .replace(/[\s_-]+/g, ' ')
    .replace(/\s*\(\d+\)\s*$/, '')
    .replace(/\s*-v\d+\s*$/i, '')
    .trim();
}

async function getProvidedNotes(req, res) {
  try {
    // Try MongoDB first (works on Heroku, Render, Fly.io, etc.)
    const dbNotes = await ProvidedNote.find({}, {
      _id: 1,
      filename: 1,
      subject: 1,
      title: 1,
      size: 1,
    }).lean();

    if (dbNotes.length > 0) {
      const mapped = dbNotes.map((n) => ({
        id: `provided-${n._id}`,
        _id: n._id,
        filename: n.filename,
        subject: n.subject,
        title: n.title,
        url: `/api/notes/provided/${n._id}/pdf`,
      }));
      return res.json(mapped);
    }

    // Fallback: scan local filesystem (development)
    const dirs = ['NOTES', 'notes'];
    let allNotes = [];
    let id = 0;

    for (const dirName of dirs) {
      const dirPath = path.join(ASSETS_DIR, dirName);
      if (!fs.existsSync(dirPath)) continue;

      const files = scanDir(dirPath);
      for (const f of files) {
        const subject = parseSubject(f.name);
        allNotes.push({
          id: `provided-${id++}`,
          filename: f.name,
          subject,
          title: subject,
          url: `/assets/${dirName}/${f.relPath}`,
        });
      }
    }

    res.json(allNotes);
  } catch (error) {
    console.error("getProvidedNotes Error:", error);
    res.status(500).json({ message: "Error reading provided notes" });
  }
}

async function getProvidedNotePdf(req, res) {
  try {
    const note = await ProvidedNote.findById(req.params.id).lean();
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `inline; filename="${note.filename}"`);
    res.set('Content-Length', note.size);
    res.send(note.data);
  } catch (error) {
    console.error("getProvidedNotePdf Error:", error);
    res.status(500).json({ message: "Error serving PDF" });
  }
}

module.exports = {
  createNote,
  getUserNotes,
  getProvidedNotes,
  getProvidedNotePdf,
};
