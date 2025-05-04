const mongoose = require('mongoose');

// MongoDB connection URI - using MongoDB Atlas free tier instead of local MongoDB
const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb+srv://testuser:testpassword@cluster0.mongodb.net/notes-app?retryWrites=true&w=majority';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(CONNECTION_URL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Instead of exiting, return null and let the server handle this
    return null;
  }
};

module.exports = { connectDB };
