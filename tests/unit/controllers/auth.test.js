const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../src/models/User");

// Mock the email service
jest.mock("../src/services/emailService", () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue({ success: true }),
  sendWelcomeEmail: jest.fn().mockResolvedValue({ success: true }),
}));

// Create a minimal Express app for testing
const express = require("express");
const authRoutes = require("../src/routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Controller Tests", () => {
  beforeAll(async () => {
    // Connect to a test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/studly-test",
      );
    }
  });

  beforeEach(async () => {
    // Clear users collection before each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/auth/signup", () => {
    it("should create a new user with valid data", async () => {
      const userData = {
        email: "newuser@test.com",
        password: "SecurePass123!",
        fullname: "Test User",
        level: "egcse",
        subjects: ["Mathematics", "English"],
      };

      const res = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(201);

      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.user.fullname).toBe(userData.fullname);
    });

    it("should reject signup with duplicate email", async () => {
      const userData = {
        email: "test@test.com",
        password: "SecurePass123!",
        fullname: "Test User",
        level: "jc",
        subjects: ["Biology"],
      };

      await request(app).post("/api/auth/signup").send(userData);

      const res = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(400);

      expect(res.body.message).toContain("already exists");
    });

    it("should reject signup with invalid email", async () => {
      const userData = {
        email: "invalid-email",
        password: "SecurePass123!",
        fullname: "Test User",
        level: "egcse",
        subjects: ["Math"],
      };

      const res = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(400);

      expect(res.body.errors).toBeDefined();
    });

    it("should reject signup with weak password", async () => {
      const userData = {
        email: "test@test.com",
        password: "weak",
        fullname: "Test User",
        level: "jc",
        subjects: ["Math"],
      };

      const res = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(400);

      expect(res.body.errors).toBeDefined();
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Create a test user
      const hashedPassword = await bcryptjs.hash("TestPass123!", 10);
      await User.create({
        email: "login@test.com",
        password: hashedPassword,
        fullname: "Login Test User",
        level: "egcse",
        subjects: ["Math"],
      });
    });

    it("should login user with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login@test.com",
          password: "TestPass123!",
        })
        .expect(200);

      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe("login@test.com");
    });

    it("should reject login with invalid email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nonexistent@test.com",
          password: "TestPass123!",
        })
        .expect(401);

      expect(res.body.message).toContain("Invalid");
    });

    it("should reject login with wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login@test.com",
          password: "WrongPassword123!",
        })
        .expect(401);

      expect(res.body.message).toContain("Invalid");
    });
  });

  describe("POST /api/auth/forgot-password", () => {
    beforeEach(async () => {
      const hashedPassword = await bcryptjs.hash("TestPass123!", 10);
      await User.create({
        email: "forgot@test.com",
        password: hashedPassword,
        fullname: "Forgot Test User",
        level: "jc",
        subjects: ["Biology"],
      });
    });

    it("should send password reset email for existing user", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({
          email: "forgot@test.com",
        })
        .expect(200);

      expect(res.body.message).toContain("reset");
    });

    it("should handle non-existent email gracefully", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({
          email: "nonexistent@test.com",
        })
        .expect(200); // Should still return 200 for security
    });
  });

  describe("GET /api/auth/me", () => {
    let token;

    beforeEach(async () => {
      const user = await User.create({
        email: "me@test.com",
        password: await bcryptjs.hash("TestPass123!", 10),
        fullname: "Me Test User",
        level: "egcse",
        subjects: ["Math"],
      });

      token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "test-secret",
        {
          expiresIn: "24h",
        },
      );
    });

    it("should return current user info with valid token", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.user.email).toBe("me@test.com");
    });

    it("should reject request without token", async () => {
      const res = await request(app).get("/api/auth/me").expect(401);

      expect(res.body.message).toContain("token");
    });

    it("should reject request with invalid token", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
    });
  });
});
