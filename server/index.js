const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes');
const db = require('./db');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/api/notes', noteRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to MERN Notes API');
});

// API info route
app.get('/api', (req, res) => {
  res.json({
    message: 'MERN Notes API is running',
    endpoints: {
      notes: '/api/notes'
    }
  });
});

// Connect to MongoDB and start server
db.connectDB()
  .then((connection) => {
    // Start server even if MongoDB connection fails
    // This allows the frontend to work with mock data if needed
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port: ${PORT}`);
      if (!connection) {
        console.warn('Warning: Running without MongoDB connection. Some features may be limited.');
      }
    });
  })
  .catch((error) => {
    console.error('Error during startup:', error.message);
    // Start server anyway to allow the app to function with limited capabilities
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port: ${PORT} (without database connection)`);
    });
  });
