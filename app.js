const path = require('path');
const express = require('express');

// ─── Security & Utility Middleware ───
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

// ─── Route Imports ───
const authRoutes = require('./src/routes/authRoutes');
const studyRoutes = require('./src/routes/studyRoutes');
const quizRoutes = require('./src/routes/quizRoutes');
const notesRoutes = require('./src/routes/notesRoutes');
const plannerRoutes = require('./src/routes/plannerRoutes');
const progressRoutes = require('./src/routes/progressRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const focusRoutes = require('./src/routes/focusRoutes');
const videoRoutes = require('./src/routes/videoRoutes');
const leaderboardRoutes = require('./src/routes/leaderboardRoutes');
const syllabusRoutes = require('./src/routes/syllabusRoutes');

const app = express();

// ════════════════════════════════════════════════════════════════
// GLOBAL MIDDLEWARE
// ════════════════════════════════════════════════════════════════

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false, // Disabled for dev; enable with proper config in production
}));

// Compression (gzip)
app.use(compression());

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// CORS  — restrict in production
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'];

app.use(cors({
  origin: CORS_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many requests, please try again later.' },
});
app.use(globalLimiter);

// Auth endpoint rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 login/signup attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many authentication attempts, please try again later.' },
});
app.use('/api/auth', authLimiter);

// AI endpoint rate limiter
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 AI questions per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'AI rate limit reached. Please slow down.' },
});
app.use('/api/chat/ask', aiLimiter);

// ════════════════════════════════════════════════════════════════
// STATIC FILE SERVING
// ════════════════════════════════════════════════════════════════
const SERVE_STATIC = process.env.SERVE_STATIC !== 'false';
const frontendDist = path.join(__dirname, 'frontend', 'dist');
const projectAssets = path.join(__dirname, '..', 'assets');

if (SERVE_STATIC) {
  // 1) Frontend built assets (must come first to avoid asset path conflicts)
  app.use(express.static(frontendDist));

  // 2) Project assets (videos, PDFs, syllabuses)
  app.use('/assets', express.static(projectAssets));
}

// ════════════════════════════════════════════════════════════════
// API ROUTES
// ════════════════════════════════════════════════════════════════
app.use('/api/auth', authRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/syllabus', syllabusRoutes);

// ════════════════════════════════════════════════════════════════
// SPA FALLBACK — serve React index.html for all non-API routes
// ════════════════════════════════════════════════════════════════
if (SERVE_STATIC) {
  const indexHtml = path.join(frontendDist, 'index.html');
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ status: 'error', message: 'API route not found' });
    }
    res.sendFile(indexHtml);
  });
}

// ════════════════════════════════════════════════════════════════
// GLOBAL ERROR HANDLER
// ════════════════════════════════════════════════════════════════
app.use((err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[ERROR] ${err.message}${err.stack ? '\n' + err.stack : ''}`);
  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

module.exports = app;
