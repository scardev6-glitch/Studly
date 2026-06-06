const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const Topic = require("../src/models/Topic");
const express = require("express");

const syllabusRoutes = require("../src/routes/syllabusRoutes");

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

app.use("/api/syllabus", syllabusRoutes);

describe("Syllabus Controller Tests", () => {
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
    await Topic.deleteMany({});

    const user = await User.create({
      email: "syllabus@test.com",
      password: "TestPass123!",
      fullname: "Syllabus Test User",
      level: "egcse",
      subjects: ["Mathematics", "English"],
    });
    userId = user._id;

    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test-secret", {
      expiresIn: "24h",
    });

    // Create test topics
    await Topic.create([
      {
        name: "Numbers and Operations",
        subject: "Mathematics",
        level: "egcse",
        description: "Basic math concepts",
        subtopics: ["Integers", "Fractions", "Decimals"],
      },
      {
        name: "Algebra",
        subject: "Mathematics",
        level: "egcse",
        description: "Algebraic expressions and equations",
        subtopics: ["Variables", "Equations", "Factoring"],
      },
      {
        name: "Literature",
        subject: "English",
        level: "egcse",
        description: "Literary analysis",
        subtopics: ["Poetry", "Prose", "Drama"],
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/syllabus", () => {
    it("should retrieve full syllabus", async () => {
      const res = await request(app)
        .get("/api/syllabus")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.syllabus)).toBe(true);
      expect(res.body.syllabus.length).toBeGreaterThan(0);
      expect(res.body.syllabus[0]).toHaveProperty("name");
      expect(res.body.syllabus[0]).toHaveProperty("subject");
      expect(res.body.syllabus[0]).toHaveProperty("level");
    });
  });

  describe("GET /api/syllabus/subject/:subject", () => {
    it("should retrieve syllabus by subject", async () => {
      const res = await request(app)
        .get("/api/syllabus/subject/Mathematics")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.topics)).toBe(true);
      expect(res.body.topics.every((t) => t.subject === "Mathematics")).toBe(
        true,
      );
    });
  });

  describe("GET /api/syllabus/level/:level", () => {
    it("should retrieve syllabus by level", async () => {
      const res = await request(app)
        .get("/api/syllabus/level/egcse")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.topics)).toBe(true);
      expect(res.body.topics.every((t) => t.level === "egcse")).toBe(true);
    });
  });

  describe("GET /api/syllabus/subject/:subject/level/:level", () => {
    it("should retrieve syllabus by subject and level", async () => {
      const res = await request(app)
        .get("/api/syllabus/subject/Mathematics/level/egcse")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.topics)).toBe(true);
      expect(
        res.body.topics.every(
          (t) => t.subject === "Mathematics" && t.level === "egcse",
        ),
      ).toBe(true);
    });
  });

  describe("GET /api/syllabus/:topicId", () => {
    let topicId;

    beforeEach(async () => {
      const topic = await Topic.findOne({ name: "Numbers and Operations" });
      topicId = topic._id;
    });

    it("should retrieve topic details with subtopics", async () => {
      const res = await request(app)
        .get(`/api/syllabus/${topicId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body._id.toString()).toBe(topicId.toString());
      expect(res.body).toHaveProperty("subtopics");
      expect(Array.isArray(res.body.subtopics)).toBe(true);
    });
  });

  describe("GET /api/syllabus/search", () => {
    it("should search topics by keyword", async () => {
      const res = await request(app)
        .get("/api/syllabus/search?q=algebra")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.results)).toBe(true);
    });
  });
});
