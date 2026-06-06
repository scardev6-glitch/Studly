const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const focusController = require("../controllers/focusController");
const { protect } = require("../middleware/authMiddleware");

// Validation rules
const startFocusValidation = [
  body("durationMinutes")
    .isInt({ min: 1, max: 120 })
    .withMessage("Duration must be between 1 and 120 minutes"),
  body("topicId").optional().isMongoId().withMessage("Invalid topic ID"),
];

const sessionIdValidation = [
  param("sessionId").isMongoId().withMessage("Invalid session ID"),
];

router.post(
  "/start",
  protect,
  startFocusValidation,
  focusController.startFocus,
);
router.post(
  "/:sessionId/complete",
  protect,
  sessionIdValidation,
  focusController.completeFocus,
);
router.post(
  "/:sessionId/abandon",
  protect,
  sessionIdValidation,
  focusController.abandonFocus,
);
router.post(
  "/:sessionId/violation",
  protect,
  sessionIdValidation,
  focusController.recordViolation,
);
router.get("/history", protect, focusController.getFocusHistory);
router.get("/status", protect, focusController.getFocusStatus);

module.exports = router;
