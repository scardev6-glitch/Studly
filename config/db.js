const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      console.warn('⚠️  No MongoDB URI found in environment variables');
      return;
    }
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    isConnected = false;
  }
};

const getConnectionStatus = () => isConnected;

module.exports = connectDB;
module.exports.getConnectionStatus = getConnectionStatus;
