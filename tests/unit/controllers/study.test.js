const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const Topic = require("../src/models/Topic");
const StudySession = require("../src/models/StudySession");
const express = require("express");

const studyRoutes = require("../src/routes/studyRoutes");

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

app.use("/api/study", studyRoutes);

describe("Study Controller Tests", () => {
  let userId;
  let token;
  let topicId;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/studly-test",
      );
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Topic.deleteMany({});
    await StudySession.deleteMany({});

    const user = await User.create({
      email: "study@test.com",
      password: "TestPass123!",
      fullname: "Study Test User",
      level: "egcse",
      subjects: ["Mathematics", "Biology"],
    });
    userId = user._id;

    const topic = await Topic.create({
      name: "Algebra Fundamentals",
      subject: "Mathematics",
      level: "egcse",
      description: "Learn the basics of algebra",
    });
    topicId = topic._id;

    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test-secret", {
      expiresIn: "24h",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/study/topics", () => {
    beforeEach(async () => {
      await Topic.create([
        { name: "Geometry", subject: "Mathematics", level: "egcse" },
        { name: "Statistics", subject: "Mathematics", level: "jc" },
      ]);
    });

    it("should retrieve all study topics", async () => {
      const res = await request(app)
        .get("/api/study/topics")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.topics)).toBe(true);
      expect(res.body.topics.length).toBeGreaterThan(0);
    });

    it("should filter topics by subject", async () => {
      const res = await request(app)
        .get("/api/study/topics?subject=Mathematics")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.topics.every((t) => t.subject === "Mathematics")).toBe(
        true,
      );
    });

    it("should filter topics by level", async () => {
      const res = await request(app)
        .get("/api/study/topics?level=egcse")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.topics.every((t) => t.level === "egcse")).toBe(true);
    });
  });

  describe("GET /api/study/topic/:topicId", () => {
    it("should retrieve topic details", async () => {
      const res = await request(app)
        .get(`/api/study/topic/${topicId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body._id.toString()).toBe(topicId.toString());
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("subject");
      expect(res.body).toHaveProperty("description");
    });
  });

  describe("POST /api/study/start-session", () => {
    it("should start a study session", async () => {
      const res = await request(app)
        .post("/api/study/start-session")
        .set("Authorization", `Bearer ${token}`)
        .send({
          topicId: topicId.toString(),
          type: "video",
        })
        .expect(201);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.topicId.toString()).toBe(topicId.toString());
      expect(res.body.status).toBe("active");
    });
  });

  describe("POST /api/study/end-session/:sessionId", () => {
    let sessionId;

    beforeEach(async () => {
      const session = await StudySession.create({
        userId,
        topicId,
        type: "video",
        startTime: new Date(),
        status: "active",
      });
      sessionId = session._id;
    });

    it("should end a study session", async () => {
      const res = await request(app)
        .post(`/api/study/end-session/${sessionId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          duration: 1800, // 30 minutes
          completed: true,
        })
        .expect(200);

      expect(res.body.status).toBe("completed");
      expect(res.body).toHaveProperty("xpGained");
    });
  });

  describe("GET /api/study/history", () => {
    beforeEach(async () => {
      await StudySession.create({
        userId,
        topicId,
        type: "quiz",
        status: "completed",
        duration: 600,
        xpGained: 50,
      });
    });

    it("should retrieve study session history", async () => {
      const res = await request(app)
        .get("/api/study/history")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.history)).toBe(true);
      expect(res.body.history.length).toBeGreaterThan(0);
    });
  });
});
