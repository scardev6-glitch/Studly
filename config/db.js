const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/studly';
  await mongoose.connect(uri);
  return mongoose.connection;
}

module.exports = connectDB;
