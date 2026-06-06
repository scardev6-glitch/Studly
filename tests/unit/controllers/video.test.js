const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const Video = require("../src/models/Video");
const express = require("express");

const videoRoutes = require("../src/routes/videoRoutes");

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

app.use("/api/videos", videoRoutes);

describe("Video Controller Tests", () => {
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
    await Video.deleteMany({});

    const user = await User.create({
      email: "video@test.com",
      password: "TestPass123!",
      fullname: "Video Test User",
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

  describe("GET /api/videos/topic/:topic", () => {
    beforeEach(async () => {
      await Video.create([
        {
          topic: "Algebra",
          title: "Introduction to Variables",
          description: "Learn about variables in algebra",
          youtubeId: "dQw4w9WgXcQ",
          duration: 600,
          difficulty: "easy",
        },
        {
          topic: "Algebra",
          title: "Solving Linear Equations",
          description: "Methods for solving equations",
          youtubeId: "dQw4w9WgXcQ",
          duration: 900,
          difficulty: "medium",
        },
      ]);
    });

    it("should retrieve videos for a topic", async () => {
      const res = await request(app)
        .get("/api/videos/topic/Algebra")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.videos)).toBe(true);
      expect(res.body.videos.length).toBe(2);
      expect(res.body.videos[0]).toHaveProperty("title");
      expect(res.body.videos[0]).toHaveProperty("youtubeId");
    });

    it("should filter videos by difficulty", async () => {
      const res = await request(app)
        .get("/api/videos/topic/Algebra?difficulty=easy")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.videos.every((v) => v.difficulty === "easy")).toBe(true);
    });
  });

  describe("GET /api/videos/:videoId", () => {
    let videoId;

    beforeEach(async () => {
      const video = await Video.create({
        topic: "Geometry",
        title: "Angles and Triangles",
        description: "Understanding angles",
        youtubeId: "dQw4w9WgXcQ",
        duration: 1200,
        difficulty: "medium",
      });
      videoId = video._id;
    });

    it("should retrieve video details", async () => {
      const res = await request(app)
        .get(`/api/videos/${videoId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body._id.toString()).toBe(videoId.toString());
      expect(res.body).toHaveProperty("title");
      expect(res.body).toHaveProperty("youtubeId");
      expect(res.body).toHaveProperty("duration");
    });
  });

  describe("GET /api/videos/search", () => {
    beforeEach(async () => {
      await Video.create([
        {
          topic: "Algebra",
          title: "Quadratic Equations",
          description: "Advanced algebra concepts",
          youtubeId: "test1",
          duration: 1500,
        },
        {
          topic: "Algebra",
          title: "Factoring Methods",
          description: "Breaking down expressions",
          youtubeId: "test2",
          duration: 1200,
        },
      ]);
    });

    it("should search videos by keyword", async () => {
      const res = await request(app)
        .get("/api/videos/search?q=equation")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.results)).toBe(true);
    });
  });

  describe("GET /api/videos", () => {
    beforeEach(async () => {
      await Video.create({
        topic: "Test Topic",
        title: "Test Video",
        description: "Test description",
        youtubeId: "test",
        duration: 600,
      });
    });

    it("should retrieve all available videos", async () => {
      const res = await request(app)
        .get("/api/videos")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.videos)).toBe(true);
    });
  });
});
