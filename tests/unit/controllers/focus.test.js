const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const FocusSession = require("../src/models/FocusSession");
const express = require("express");

jest.mock("../src/services/gamificationEngine", () => ({
  awardPoints: jest.fn().mockResolvedValue({ pointsAwarded: 100 }),
}));

const focusRoutes = require("../src/routes/focusRoutes");

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

app.use("/api/focus", focusRoutes);

describe("Focus Controller Tests", () => {
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
    await FocusSession.deleteMany({});

    const user = await User.create({
      email: "focus@test.com",
      password: "TestPass123!",
      fullname: "Focus Test User",
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

  describe("POST /api/focus/start", () => {
    it("should start a new focus session", async () => {
      const res = await request(app)
        .post("/api/focus/start")
        .set("Authorization", `Bearer ${token}`)
        .send({
          durationMinutes: 25,
        })
        .expect(201);

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("startTime");
      expect(res.body.status).toBe("active");
      expect(res.body.durationMinutes).toBe(25);
    });

    it("should reject invalid duration", async () => {
      const res = await request(app)
        .post("/api/focus/start")
        .set("Authorization", `Bearer ${token}`)
        .send({
          durationMinutes: 0,
        })
        .expect(400);
    });

    it("should reject duration over 120 minutes", async () => {
      const res = await request(app)
        .post("/api/focus/start")
        .set("Authorization", `Bearer ${token}`)
        .send({
          durationMinutes: 121,
        })
        .expect(400);
    });

    it("should require authentication", async () => {
      const res = await request(app)
        .post("/api/focus/start")
        .send({
          durationMinutes: 25,
        })
        .expect(401);
    });
  });

  describe("POST /api/focus/:sessionId/complete", () => {
    let sessionId;

    beforeEach(async () => {
      const session = await FocusSession.create({
        userId,
        durationMinutes: 25,
        startTime: new Date(),
        status: "active",
      });
      sessionId = session._id;
    });

    it("should complete a focus session", async () => {
      const res = await request(app)
        .post(`/api/focus/${sessionId}/complete`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.status).toBe("completed");
      expect(res.body).toHaveProperty("pointsEarned");
    });

    it("should reject invalid session ID", async () => {
      const res = await request(app)
        .post("/api/focus/invalid-id/complete")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);
    });
  });

  describe("POST /api/focus/:sessionId/abandon", () => {
    let sessionId;

    beforeEach(async () => {
      const session = await FocusSession.create({
        userId,
        durationMinutes: 25,
        startTime: new Date(),
        status: "active",
      });
      sessionId = session._id;
    });

    it("should abandon a focus session", async () => {
      const res = await request(app)
        .post(`/api/focus/${sessionId}/abandon`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.status).toBe("abandoned");
    });
  });

  describe("POST /api/focus/:sessionId/violation", () => {
    let sessionId;

    beforeEach(async () => {
      const session = await FocusSession.create({
        userId,
        durationMinutes: 25,
        startTime: new Date(),
        status: "active",
      });
      sessionId = session._id;
    });

    it("should record a focus violation", async () => {
      const res = await request(app)
        .post(`/api/focus/${sessionId}/violation`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          type: "app_switch",
        })
        .expect(201);

      expect(res.body).toHaveProperty("violationCount");
    });
  });

  describe("GET /api/focus/history", () => {
    beforeEach(async () => {
      await FocusSession.create([
        {
          userId,
          durationMinutes: 25,
          startTime: new Date(),
          status: "completed",
          pointsEarned: 50,
        },
        {
          userId,
          durationMinutes: 50,
          startTime: new Date(Date.now() - 86400000),
          status: "completed",
          pointsEarned: 100,
        },
      ]);
    });

    it("should retrieve focus session history", async () => {
      const res = await request(app)
        .get("/api/focus/history")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.history)).toBe(true);
      expect(res.body.history.length).toBe(2);
    });
  });

  describe("GET /api/focus/status", () => {
    beforeEach(async () => {
      await FocusSession.create({
        userId,
        durationMinutes: 25,
        startTime: new Date(),
        status: "active",
      });
    });

    it("should retrieve current focus session status", async () => {
      const res = await request(app)
        .get("/api/focus/status")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("activeSession");
      expect(res.body.activeSession.status).toBe("active");
    });
  });

  describe("GET /api/focus/stats", () => {
    beforeEach(async () => {
      await FocusSession.create({
        userId,
        durationMinutes: 25,
        startTime: new Date(),
        status: "completed",
        pointsEarned: 50,
      });
    });

    it("should retrieve focus statistics", async () => {
      const res = await request(app)
        .get("/api/focus/stats")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("totalSessionsCompleted");
      expect(res.body).toHaveProperty("totalMinutesFocused");
      expect(res.body).toHaveProperty("averageSessionDuration");
      expect(res.body).toHaveProperty("totalPointsEarned");
    });
  });
});
