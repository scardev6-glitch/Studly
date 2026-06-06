const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Note = require("../src/models/Note");
const User = require("../src/models/User");
const Topic = require("../src/models/Topic");
const express = require("express");

jest.mock("../src/services/aiEngine", () => ({
  summarizeNotes: jest.fn().mockResolvedValue("Mock summary"),
}));

const notesRoutes = require("../src/routes/notesRoutes");

const app = express();
app.use(express.json());

// Mock auth middleware
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "test-secret",
      );
      req.userId = decoded.id;
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
  next();
});

app.use("/api/notes", notesRoutes);

describe("Notes Controller Tests", () => {
  let userId;
  let topicId;
  let token;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/studly-test",
      );
    }
  });

  beforeEach(async () => {
    await Note.deleteMany({});
    await User.deleteMany({});
    await Topic.deleteMany({});

    // Create test user
    const user = await User.create({
      email: "notes@test.com",
      password: "TestPass123!",
      fullname: "Notes Test User",
      level: "egcse",
      subjects: ["Math"],
    });
    userId = user._id;

    // Create test topic
    const topic = await Topic.create({
      name: "Algebra",
      description: "Algebra basics",
      level: "egcse",
      subject: "Mathematics",
    });
    topicId = topic._id;

    // Create token
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test-secret", {
      expiresIn: "24h",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/notes/create", () => {
    it("should create a new note with valid data", async () => {
      const noteData = {
        topicId: topicId.toString(),
        content: "This is a test note about algebra",
        tags: ["algebra", "math"],
      };

      const res = await request(app)
        .post("/api/notes/create")
        .set("Authorization", `Bearer ${token}`)
        .send(noteData)
        .expect(201);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.content).toBe(noteData.content);
      expect(res.body.userId.toString()).toBe(userId.toString());
    });

    it("should reject note creation without authentication", async () => {
      const res = await request(app)
        .post("/api/notes/create")
        .send({
          topicId: topicId.toString(),
          content: "Test note",
        })
        .expect(401);
    });

    it("should reject note with missing required fields", async () => {
      const res = await request(app)
        .post("/api/notes/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          topicId: topicId.toString(),
          // Missing content
        })
        .expect(400);
    });

    it("should reject note with invalid topic ID", async () => {
      const res = await request(app)
        .post("/api/notes/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          topicId: "invalid-id",
          content: "Test note",
        })
        .expect(400);
    });
  });

  describe("GET /api/notes", () => {
    beforeEach(async () => {
      // Create test notes
      await Note.create({
        userId,
        topicId,
        content: "Test note 1",
        tags: ["test"],
      });
      await Note.create({
        userId,
        topicId,
        content: "Test note 2",
        tags: ["test"],
      });
    });

    it("should retrieve all notes for authenticated user", async () => {
      const res = await request(app)
        .get("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.notes).toHaveLength(2);
      expect(res.body.notes[0]).toHaveProperty("_id");
      expect(res.body.notes[0]).toHaveProperty("content");
    });

    it("should return empty array when no notes exist", async () => {
      await Note.deleteMany({});

      const res = await request(app)
        .get("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.notes).toHaveLength(0);
    });

    it("should not retrieve other users notes", async () => {
      // Create another user
      const otherUser = await User.create({
        email: "other@test.com",
        password: "TestPass123!",
        fullname: "Other User",
        level: "jc",
        subjects: ["Biology"],
      });

      // Create note for other user
      await Note.create({
        userId: otherUser._id,
        topicId,
        content: "Other user note",
      });

      const res = await request(app)
        .get("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.notes).toHaveLength(2); // Should only see own notes
      expect(
        res.body.notes.every((n) => n.userId.toString() === userId.toString()),
      ).toBe(true);
    });
  });

  describe("DELETE /api/notes/:id", () => {
    let noteId;

    beforeEach(async () => {
      const note = await Note.create({
        userId,
        topicId,
        content: "Note to delete",
      });
      noteId = note._id;
    });

    it("should delete note with valid ID", async () => {
      const res = await request(app)
        .delete(`/api/notes/${noteId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.message).toContain("deleted");

      const deletedNote = await Note.findById(noteId);
      expect(deletedNote).toBeNull();
    });

    it("should reject deletion of non-existent note", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .delete(`/api/notes/${fakeId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("PUT /api/notes/:id", () => {
    let noteId;

    beforeEach(async () => {
      const note = await Note.create({
        userId,
        topicId,
        content: "Original content",
      });
      noteId = note._id;
    });

    it("should update note with valid data", async () => {
      const res = await request(app)
        .put(`/api/notes/${noteId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          content: "Updated content",
          tags: ["updated"],
        })
        .expect(200);

      expect(res.body.content).toBe("Updated content");
      expect(res.body.tags).toContain("updated");
    });
  });
});
