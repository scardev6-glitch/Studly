const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/**
 * Check if MongoDB is actually connected.
 */
function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

const protect = (req, res, next) => {
  // Dev bypass — only when MongoDB is offline AND AUTH_DISABLED=true
  if (process.env.AUTH_DISABLED === 'true' && !isMongoConnected()) {
    req.user = { id: 'dev-user-id', fullname: 'Dev User' };
    return next();
  }

  // Extract Bearer token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized — no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure decoded token has required fields
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Not authorized — invalid token payload' });
    }

    req.user = { id: decoded.id, fullname: decoded.fullname || '' };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Not authorized — token expired' });
    }
    return res.status(401).json({ message: 'Not authorized — invalid token' });
  }
};

module.exports = { protect };
