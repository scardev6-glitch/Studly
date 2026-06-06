const Notification = require("../models/Notification");

async function getNotifications(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const unreadCount = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false,
    });

    res.json({ notifications, unreadCount, page, limit });
  } catch (error) {
    // Return empty results if MongoDB is unavailable or userId is invalid
    res.json({ notifications: [], unreadCount: 0, page: 1, limit });
  }
}

async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    if (id === "all") {
      await Notification.updateMany(
        { userId: req.user.id, isRead: false },
        { isRead: true },
      );
      return res.json({ message: "All marked as read" });
    }
    const notif = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isRead: true },
      { new: true },
    );
    if (!notif)
      return res.status(404).json({ message: "Notification not found" });
    res.json(notif);
  } catch (error) {
    console.error("markAsRead Error:", error);
    res.status(500).json({ message: "Error marking notification as read" });
  }
}

async function deleteNotification(req, res) {
  try {
    const { id } = req.params;
    if (id === "all") {
      await Notification.deleteMany({ userId: req.user.id });
      return res.json({ message: "All notifications deleted" });
    }
    const notif = await Notification.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!notif)
      return res.status(404).json({ message: "Notification not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("deleteNotification Error:", error);
    res.status(500).json({ message: "Error deleting notification" });
  }
}

async function getUnreadCount(req, res) {
  try {
    const count = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false,
    });
    res.json({ count });
  } catch (error) {
    res.json({ count: 0 });
  }
}

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount,
};
