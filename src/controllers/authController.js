const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { sendPasswordResetEmail } = require("../services/emailService");

/**
 * Check if MongoDB is actually connected.
 */
function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

const signup = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { fullname, email, password, subjects } = req.body;

    let user;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "An account with this email already exists" });
      }

      user = new User({ fullname, email, password, subjects });
      await user.save();
    } catch (dbError) {
      throw dbError;
    }

    const token = jwt.sign(
      { id: user._id, fullname: user.fullname },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullname,
        email,
        subjects,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    const message = isDevMode() ? error.message : "Error creating account";
    res.status(500).json({ message });
  }
};

const login = async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    // Production: MongoDB-backed authentication
    let user;
    try {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (dbError) {
      console.error("DB Error during login:", dbError.message);
      return res
        .status(503)
        .json({ message: "Authentication service unavailable" });
    }

    const token = jwt.sign(
      { id: user._id, fullname: user.fullname },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        subjects: user.subjects,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const getMe = async (req, res) => {
  try {
    let user;
    try {
      user = await User.findById(req.user.id).select("-password");
    } catch (dbError) {
      throw dbError;
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("getMe Error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Do NOT reveal whether the email exists — always return success
    try {
      const user = await User.findOne({ email });
      if (user) {
        // Generate password reset token (15 minute expiry)
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "15m",
        });

        // Build reset URL (frontend will handle the actual reset)
        const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;

        // Send email with reset link
        const emailSent = await sendPasswordResetEmail(
          email,
          resetToken,
          resetUrl,
        );
        if (emailSent) {
          console.log(`[Password Reset] Email sent to ${email}`);
        } else {
          console.warn(
            `[Password Reset] Failed to send email to ${email}, but request logged`,
          );
        }
      }
    } catch (dbError) {
      // DB offline — just log and return generic success
      console.log(`[Password Reset] Request for ${email} (DB unavailable)`);
    }

    // Always return the same generic response regardless of outcome
    res.json({
      message:
        "If an account exists, a password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Invalid or expired reset link" });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Reset link has expired. Please request a new one." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid reset link." });
    }
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

module.exports = { signup, login, getMe, forgotPassword, resetPassword };
