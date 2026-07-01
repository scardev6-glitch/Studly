const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

// Validate required env vars (non-blocking)
if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET === "your_super_secret_jwt_key_123"
) {
  console.warn(
    "⚠️  WARNING: JWT_SECRET is weak or default. Set a strong random secret in production.",
  );
}
const AI_KEY = process.env.GEMINI_API_KEY;
if (!AI_KEY) {
  console.warn(
    "⚠️  WARNING: No AI API key set (GEMINI_API_KEY). AI features will use fallback responses.",
  );
} else {
  console.log("✅  GEMINI_API_KEY found — AI features enabled");
}

// Connect DB first, then start server
connectDB()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`⚡ Studly running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  });
