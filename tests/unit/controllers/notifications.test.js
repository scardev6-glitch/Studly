const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../src/models/User");
const Notification = require("../src/models/Notification");
const express = require("express");

const notificationRoutes = require("../src/routes/notificationRoutes");

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

app.use("/api/notifications", notificationRoutes);

describe("Notification Controller Tests", () => {
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
    await Notification.deleteMany({});

    const user = await User.create({
      email: "notification@test.com",
      password: "TestPass123!",
      fullname: "Notification Test User",
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

  describe("GET /api/notifications", () => {
    beforeEach(async () => {
      await Notification.create([
        {
          userId,
          title: "Test Notification 1",
          message: "This is a test",
          type: "achievement",
          isRead: false,
        },
        {
          userId,
          title: "Test Notification 2",
          message: "Another test",
          type: "reminder",
          isRead: true,
        },
      ]);
    });

    it("should retrieve all notifications for user", async () => {
      const res = await request(app)
        .get("/api/notifications")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.notifications)).toBe(true);
      expect(res.body.notifications.length).toBe(2);
    });

    it("should filter by read status", async () => {
      const res = await request(app)
        .get("/api/notifications?isRead=false")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.notifications.every((n) => !n.isRead)).toBe(true);
    });
  });

  describe("PUT /api/notifications/:id/read", () => {
    let notificationId;

    beforeEach(async () => {
      const notification = await Notification.create({
        userId,
        title: "Test",
        message: "Message",
        type: "reminder",
        isRead: false,
      });
      notificationId = notification._id;
    });

    it("should mark notification as read", async () => {
      const res = await request(app)
        .put(`/api/notifications/${notificationId}/read`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.isRead).toBe(true);
    });
  });

  describe("DELETE /api/notifications/:id", () => {
    let notificationId;

    beforeEach(async () => {
      const notification = await Notification.create({
        userId,
        title: "Test",
        message: "Message",
        type: "reminder",
      });
      notificationId = notification._id;
    });

    it("should delete notification", async () => {
      const res = await request(app)
        .delete(`/api/notifications/${notificationId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const deleted = await Notification.findById(notificationId);
      expect(deleted).toBeNull();
    });
  });

  describe("GET /api/notifications/unread/count", () => {
    beforeEach(async () => {
      await Notification.create([
        {
          userId,
          title: "Test 1",
          message: "Msg",
          type: "achievement",
          isRead: false,
        },
        {
          userId,
          title: "Test 2",
          message: "Msg",
          type: "achievement",
          isRead: false,
        },
        {
          userId,
          title: "Test 3",
          message: "Msg",
          type: "achievement",
          isRead: true,
        },
      ]);
    });

    it("should return unread notification count", async () => {
      const res = await request(app)
        .get("/api/notifications/unread/count")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.unreadCount).toBe(2);
    });
  });
});
