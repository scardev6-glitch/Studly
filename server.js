const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// Validate required env vars (non-blocking)
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your_super_secret_jwt_key_123') {
  console.warn('⚠️  WARNING: JWT_SECRET is weak or default. Set a strong random secret in production.');
}
if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY not set. AI features will use fallback responses.');
}

// Connect to Database (non-blocking)
connectDB().then(() => {
  const { getConnectionStatus } = require('./config/db');
  if (!getConnectionStatus()) {
    console.log('ℹ️  Running in offline mode — some features require MongoDB');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  ⚡ Studly is running on http://localhost:${PORT}`);
  console.log(`  📱 Open in browser to start learning\n`);
});
