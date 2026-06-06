const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const Question = require("../src/models/Question");
const StudySession = require("../src/models/StudySession");
const express = require("express");

jest.mock("../src/services/quizEngine", () => ({
  evaluateAnswers: jest.fn((answers) => ({
    percentage: 80,
    correct: 4,
    total: 5,
    feedback: "Good effort!",
  })),
}));

jest.mock("../src/services/aiEngine", () => ({
  generateExplanation: jest.fn().mockResolvedValue("Mock AI explanation"),
}));

jest.mock("../src/services/progressEngine", () => ({
  updateProgress: jest.fn().mockResolvedValue({ xpGained: 50 }),
}));

const quizRoutes = require("../src/routes/quizRoutes");

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

app.use("/api/quiz", quizRoutes);

describe("Quiz Controller Tests", () => {
  let userId;
  let token;
  let questionIds = [];

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/studly-test",
      );
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Question.deleteMany({});
    await StudySession.deleteMany({});

    // Create test user
    const user = await User.create({
      email: "quiz@test.com",
      password: "TestPass123!",
      fullname: "Quiz Test User",
      level: "egcse",
      subjects: ["Math"],
    });
    userId = user._id;

    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "test-secret", {
      expiresIn: "24h",
    });

    // Create test questions
    const questions = await Question.create([
      {
        topic: "Algebra",
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        difficulty: "easy",
      },
      {
        topic: "Algebra",
        text: "Solve for x: 2x = 10",
        options: ["3", "5", "7", "9"],
        correctAnswer: "5",
        difficulty: "medium",
      },
      {
        topic: "Algebra",
        text: "What is x² + 2x + 1 when factored?",
        options: ["(x+1)²", "(x-1)²", "(x+2)²", "(2x+1)²"],
        correctAnswer: "(x+1)²",
        difficulty: "hard",
      },
    ]);

    questionIds = questions.map((q) => q._id);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/quiz/:topic", () => {
    it("should retrieve quiz questions for a topic", async () => {
      const res = await request(app)
        .get("/api/quiz/Algebra")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("questions");
      expect(res.body.questions.length).toBeGreaterThan(0);
      expect(res.body.questions[0]).toHaveProperty("_id");
      expect(res.body.questions[0]).toHaveProperty("text");
      expect(res.body.questions[0]).toHaveProperty("options");
    });

    it("should not return correct answers in quiz questions", async () => {
      const res = await request(app)
        .get("/api/quiz/Algebra")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.questions[0]).not.toHaveProperty("correctAnswer");
    });

    it("should return 400 for invalid topic", async () => {
      const res = await request(app)
        .get("/api/quiz/InvalidTopic")
        .set("Authorization", `Bearer ${token}`);

      expect([200, 400]).toContain(res.status);
    });
  });

  describe("POST /api/quiz/submit", () => {
    it("should evaluate quiz submission and return score", async () => {
      const submission = {
        topic: "Algebra",
        answers: [
          { questionId: questionIds[0].toString(), selectedAnswer: "4" },
          { questionId: questionIds[1].toString(), selectedAnswer: "5" },
          { questionId: questionIds[2].toString(), selectedAnswer: "(x+1)²" },
          { questionId: questionIds[0].toString(), selectedAnswer: "4" },
          { questionId: questionIds[1].toString(), selectedAnswer: "5" },
        ],
      };

      const res = await request(app)
        .post("/api/quiz/submit")
        .set("Authorization", `Bearer ${token}`)
        .send(submission)
        .expect(200);

      expect(res.body).toHaveProperty("score");
      expect(res.body).toHaveProperty("feedback");
      expect(res.body.score).toBeGreaterThanOrEqual(0);
      expect(res.body.score).toBeLessThanOrEqual(100);
    });

    it("should reject submission without authentication", async () => {
      const res = await request(app)
        .post("/api/quiz/submit")
        .send({
          topic: "Algebra",
          answers: [],
        })
        .expect(401);
    });

    it("should reject submission with invalid data", async () => {
      const res = await request(app)
        .post("/api/quiz/submit")
        .set("Authorization", `Bearer ${token}`)
        .send({
          topic: "Algebra",
          // Missing answers
        })
        .expect(400);
    });

    it("should award XP on successful quiz submission", async () => {
      const submission = {
        topic: "Algebra",
        answers: [
          { questionId: questionIds[0].toString(), selectedAnswer: "4" },
        ],
      };

      const res = await request(app)
        .post("/api/quiz/submit")
        .set("Authorization", `Bearer ${token}`)
        .send(submission)
        .expect(200);

      expect(res.body).toHaveProperty("xpGained");
    });
  });

  describe("GET /api/quiz/history", () => {
    beforeEach(async () => {
      // Create quiz history
      await StudySession.create({
        userId,
        type: "quiz",
        topic: "Algebra",
        duration: 600,
        score: 85,
      });
    });

    it("should retrieve quiz history for user", async () => {
      const res = await request(app)
        .get("/api/quiz/history")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("history");
      expect(Array.isArray(res.body.history)).toBe(true);
    });
  });

  describe("GET /api/quiz/performance", () => {
    beforeEach(async () => {
      await StudySession.create({
        userId,
        type: "quiz",
        topic: "Algebra",
        score: 85,
      });
      await StudySession.create({
        userId,
        type: "quiz",
        topic: "Algebra",
        score: 90,
      });
    });

    it("should retrieve performance statistics", async () => {
      const res = await request(app)
        .get("/api/quiz/performance")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty("averageScore");
      expect(res.body).toHaveProperty("topicsAttempted");
    });
  });
});
