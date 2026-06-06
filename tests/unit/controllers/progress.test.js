const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const UserProgress = require("../src/models/UserProgress");
const Topic = require("../src/models/Topic");
const express = require("express");

const progressRoutes = require("../src/routes/progressRoutes");

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

app.use("/api/progress", progressRoutes);

describe("Progress Controller Tests", () => {
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
    await UserProgress.deleteMany({});
    await Topic.deleteMany({});

    // Create test user
    const user = await User.create({
      email: "progress@test.com",
      password: "TestPass123!",
      fullname: "Progress Test User",
      level: "egcse",
      subjects: ["Math", "Biology"],
      totalXp: 500,
      gamificationLevel: 2,
      points: 500,
    });
    userId = user._id;

    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test-secret", {
      expiresIn: "24h",
    });

    // Create test topic
    const topic = await Topic.create({
      name: "Algebra",
      subject: "Mathematics",
      level: "egcse",
    });
    topicId = topic._id;

    // Create progress record
    await UserProgress.create({
      userId,
      topicId,
      xpGained: 150,
      masteryPercentage: 65,
      questionsAttempted: 10,
      correctAnswers: 7,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/progress/overall", () => {
    it("should retrieve overall progress stats for user", async () => {
      const res = await request(app)
        .get("/api/progress/overall")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("totalXp");
      expect(res.body).toHaveProperty("currentLevel");
      expect(res.body).toHaveProperty("points");
      expect(res.body.totalXp).toBe(500);
      expect(res.body.currentLevel).toBe(2);
    });

    it("should return 401 without authentication", async () => {
      const res = await request(app).get("/api/progress/overall").expect(401);
    });
  });

  describe("GET /api/progress/topic/:topicId", () => {
    it("should retrieve progress for specific topic", async () => {
      const res = await request(app)
        .get(`/api/progress/topic/${topicId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("masteryPercentage");
      expect(res.body).toHaveProperty("xpGained");
      expect(res.body.masteryPercentage).toBe(65);
    });

    it("should return 0 progress for topic with no attempts", async () => {
      const newTopic = await Topic.create({
        name: "New Topic",
        subject: "Biology",
        level: "jc",
      });

      const res = await request(app)
        .get(`/api/progress/topic/${newTopic._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.masteryPercentage).toBe(0);
    });
  });

  describe("GET /api/progress/subject/:subject", () => {
    beforeEach(async () => {
      // Create multiple topics and progress records
      const topic2 = await Topic.create({
        name: "Geometry",
        subject: "Mathematics",
        level: "egcse",
      });

      await UserProgress.create({
        userId,
        topicId: topic2._id,
        xpGained: 100,
        masteryPercentage: 50,
      });
    });

    it("should retrieve progress for entire subject", async () => {
      const res = await request(app)
        .get("/api/progress/subject/Mathematics")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("subjectMastery");
      expect(res.body).toHaveProperty("topicsProgress");
      expect(Array.isArray(res.body.topicsProgress)).toBe(true);
    });
  });

  describe("GET /api/progress/gamification", () => {
    it("should retrieve gamification stats", async () => {
      const res = await request(app)
        .get("/api/progress/gamification")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("level");
      expect(res.body).toHaveProperty("currentXp");
      expect(res.body).toHaveProperty("nextLevelXp");
      expect(res.body).toHaveProperty("progressToNextLevel");
    });
  });

  describe("GET /api/progress/leaderboard/local", () => {
    beforeEach(async () => {
      // Create other users
      for (let i = 0; i < 5; i++) {
        const user = await User.create({
          email: `user${i}@test.com`,
          password: "TestPass123!",
          fullname: `User ${i}`,
          level: "egcse",
          subjects: ["Math"],
          totalXp: 300 + i * 100,
          points: 300 + i * 100,
        });
      }
    });

    it("should retrieve leaderboard rankings", async () => {
      const res = await request(app)
        .get("/api/progress/leaderboard/local")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("ranking");
      expect(Array.isArray(res.body.ranking)).toBe(true);
    });
  });

  describe("GET /api/progress/streaks", () => {
    beforeEach(async () => {
      await User.findByIdAndUpdate(userId, {
        currentStreak: 5,
        longestStreak: 12,
      });
    });

    it("should retrieve user streaks", async () => {
      const res = await request(app)
        .get("/api/progress/streaks")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("currentStreak");
      expect(res.body).toHaveProperty("longestStreak");
      expect(res.body.currentStreak).toBe(5);
      expect(res.body.longestStreak).toBe(12);
    });
  });
});
