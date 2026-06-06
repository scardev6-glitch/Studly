const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const Leaderboard = require("../src/models/Leaderboard");
const express = require("express");

const leaderboardRoutes = require("../src/routes/leaderboardRoutes");

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

app.use("/api/leaderboard", leaderboardRoutes);

describe("Leaderboard Controller Tests", () => {
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
    await Leaderboard.deleteMany({});

    // Create multiple users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = await User.create({
        email: `leaderboard${i}@test.com`,
        password: "TestPass123!",
        fullname: `User ${i}`,
        level: "egcse",
        subjects: ["Math"],
        totalXp: 100 * (i + 1),
        points: 100 * (i + 1),
      });
      users.push(user);

      await Leaderboard.create({
        userId: user._id,
        xpGained: 100 * (i + 1),
        pointsGained: 100 * (i + 1),
        rank: i + 1,
      });
    }

    userId = users[0]._id;
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test-secret", {
      expiresIn: "24h",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/leaderboard/global", () => {
    it("should retrieve global leaderboard", async () => {
      const res = await request(app)
        .get("/api/leaderboard/global")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.ranking)).toBe(true);
      expect(res.body.ranking.length).toBeGreaterThan(0);
      expect(res.body.ranking[0]).toHaveProperty("rank");
      expect(res.body.ranking[0]).toHaveProperty("user");
    });

    it("should limit leaderboard results", async () => {
      const res = await request(app)
        .get("/api/leaderboard/global?limit=3")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.ranking.length).toBeLessThanOrEqual(3);
    });
  });

  describe("GET /api/leaderboard/subject/:subject", () => {
    it("should retrieve subject-specific leaderboard", async () => {
      const res = await request(app)
        .get("/api/leaderboard/subject/Mathematics")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.ranking)).toBe(true);
    });
  });

  describe("GET /api/leaderboard/my-rank", () => {
    it("should retrieve user rank", async () => {
      const res = await request(app)
        .get("/api/leaderboard/my-rank")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("rank");
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("totalXp");
    });
  });
});
