const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const StudyPlan = require("../src/models/StudyPlan");
const express = require("express");

jest.mock("../src/services/plannerEngine", () => ({
  generatePlan: jest.fn().mockResolvedValue({
    tasks: [{ date: new Date(), topic: "Algebra", duration: 60 }],
  }),
}));

const plannerRoutes = require("../src/routes/plannerRoutes");

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

app.use("/api/planner", plannerRoutes);

describe("Planner Controller Tests", () => {
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
    await StudyPlan.deleteMany({});

    const user = await User.create({
      email: "planner@test.com",
      password: "TestPass123!",
      fullname: "Planner Test User",
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

  describe("POST /api/planner/create", () => {
    it("should create a new study plan", async () => {
      const res = await request(app)
        .post("/api/planner/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          topics: ["Algebra", "Geometry"],
          hoursPerWeek: 10,
        })
        .expect(201);

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("tasks");
    });
  });

  describe("GET /api/planner/:planId", () => {
    let planId;

    beforeEach(async () => {
      const plan = await StudyPlan.create({
        userId,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        topics: ["Algebra"],
        tasks: [],
      });
      planId = plan._id;
    });

    it("should retrieve study plan by ID", async () => {
      const res = await request(app)
        .get(`/api/planner/${planId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body._id.toString()).toBe(planId.toString());
    });
  });

  describe("GET /api/planner", () => {
    beforeEach(async () => {
      await StudyPlan.create([
        {
          userId,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          topics: ["Algebra"],
          tasks: [],
        },
      ]);
    });

    it("should retrieve all user plans", async () => {
      const res = await request(app)
        .get("/api/planner")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.plans)).toBe(true);
    });
  });

  describe("DELETE /api/planner/:planId", () => {
    let planId;

    beforeEach(async () => {
      const plan = await StudyPlan.create({
        userId,
        startDate: new Date(),
        endDate: new Date(),
        topics: ["Math"],
        tasks: [],
      });
      planId = plan._id;
    });

    it("should delete a study plan", async () => {
      const res = await request(app)
        .delete(`/api/planner/${planId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const deleted = await StudyPlan.findById(planId);
      expect(deleted).toBeNull();
    });
  });
});
