/**
 * Email Service for Studly
 * Handles sending transactional emails (password reset, notifications, etc.)
 *
 * Configure with environment variables:
 * - EMAIL_SERVICE: 'gmail' | 'smtp' | 'sendgrid' | 'test'
 * - EMAIL_USER: Sender email address
 * - EMAIL_PASSWORD: Service password/API key
 * - EMAIL_FROM: From name (optional, defaults to EMAIL_USER)
 */

const nodemailer = require("nodemailer");

// Determine which transporter to use based on environment
let transporter = null;

if (process.env.EMAIL_SERVICE === "test" || !process.env.EMAIL_SERVICE) {
  // Development: Use ethereal test account or console logging
  console.warn(
    "⚠️  Email service not configured. Using test mode. Set EMAIL_SERVICE env var to enable real emails.",
  );
  transporter = {
    sendMail: async (mailOptions) => {
      console.log("[Email Test Mode]", {
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text ? mailOptions.text.substring(0, 100) : "",
      });
      return { messageId: "test-" + Date.now() };
    },
  };
} else if (
  process.env.EMAIL_SERVICE === "gmail" ||
  process.env.EMAIL_SERVICE === "smtp"
) {
  // Gmail or generic SMTP
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE === "gmail" ? "gmail" : undefined,
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
} else if (process.env.EMAIL_SERVICE === "sendgrid") {
  // SendGrid
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.EMAIL_PASSWORD);
  transporter = {
    sendMail: async (mailOptions) => {
      const msg = {
        to: mailOptions.to,
        from: process.env.EMAIL_USER,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html,
      };
      return sgMail.send(msg);
    },
  };
}

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(email, resetToken, resetUrl) {
  try {
    if (!transporter) {
      console.warn("Email service not available");
      return false;
    }

    const mailOptions = {
      to: email,
      subject: "Studly - Password Reset Request",
      text: `
Reset your password by clicking the link below:
${resetUrl}

This link expires in 15 minutes.
      `,
      html: `
        <h2>Reset Your Password</h2>
        <p>You requested a password reset for your Studly account.</p>
        <p><a href="${resetUrl}" style="background-color: #6366f1; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Reset Password</a></p>
        <p>Or copy this link: ${resetUrl}</p>
        <p style="color: #999; font-size: 12px;">This link expires in 15 minutes.</p>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("[Email Sent]", { to: email, messageId: result.messageId });
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    return false;
  }
}

/**
 * Send welcome email (optional)
 */
async function sendWelcomeEmail(email, fullname) {
  try {
    if (!transporter) return false;

    const mailOptions = {
      to: email,
      subject: "Welcome to Studly!",
      text: `
Hi ${fullname},

Welcome to Studly! Your account has been created successfully.

Start learning: https://studly.local
      `,
      html: `
        <h2>Welcome to Studly!</h2>
        <p>Hi ${fullname},</p>
        <p>Your account has been created successfully. You're ready to start your learning journey!</p>
        <p><a href="https://studly.local/dashboard">Go to Dashboard</a></p>
      `,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
    return false;
  }
}

module.exports = {
  sendPasswordResetEmail,
  sendWelcomeEmail,
};
