const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const CommunityMessage = require("../src/models/CommunityMessage");
const express = require("express");

const chatRoutes = require("../src/routes/chatRoutes");

const app = express();
app.use(express.json());

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

app.use("/api/chat", chatRoutes);

describe("Chat Controller Tests", () => {
  let userId;
  let token;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/studly-test",
      );
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await CommunityMessage.deleteMany({});

    const user = await User.create({
      email: "chat@test.com",
      password: "TestPass123!",
      fullname: "Chat Test User",
      level: "egcse",
      subjects: ["Math"],
    });
    userId = user._id;

    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test-secret", {
      expiresIn: "24h",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/chat/message", () => {
    it("should send a community message", async () => {
      const res = await request(app)
        .post("/api/chat/message")
        .set("Authorization", `Bearer ${token}`)
        .send({
          topic: "Algebra",
          text: "How do I solve quadratic equations?",
        })
        .expect(201);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.text).toBe("How do I solve quadratic equations?");
      expect(res.body.userId.toString()).toBe(userId.toString());
    });
  });

  describe("GET /api/chat/messages/:topic", () => {
    beforeEach(async () => {
      await CommunityMessage.create([
        {
          userId,
          topic: "Algebra",
          text: "Message 1",
          likes: 0,
        },
        {
          userId,
          topic: "Algebra",
          text: "Message 2",
          likes: 5,
        },
      ]);
    });

    it("should retrieve messages for a topic", async () => {
      const res = await request(app)
        .get("/api/chat/messages/Algebra")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.messages)).toBe(true);
      expect(res.body.messages.length).toBe(2);
    });
  });

  describe("DELETE /api/chat/message/:messageId", () => {
    let messageId;

    beforeEach(async () => {
      const message = await CommunityMessage.create({
        userId,
        topic: "Algebra",
        text: "Message to delete",
      });
      messageId = message._id;
    });

    it("should delete own message", async () => {
      const res = await request(app)
        .delete(`/api/chat/message/${messageId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const deleted = await CommunityMessage.findById(messageId);
      expect(deleted).toBeNull();
    });
  });
});
