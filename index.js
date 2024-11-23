// Import essential dependencies
require('express-async-errors');
require('dotenv').config();

// Core Node.js and Express imports
const express = require('express');
const path = require('path');

// Database and configuration imports
const connectDatabase = require('./config/databaseConfig');
const Routes = require('./routes/index');

// Third-party middleware imports
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');

// Utility imports
require('./utils/cronJobs');

// Create Express application
const app = express();
const port = process.env.PORT || 5000;

// ==================== MIDDLEWARE CONFIGURATION ====================

// Security Middleware
app.use(cors()); 

// Logging Middleware
app.use(morgan('tiny')); // HTTP request logger

// Body Parsing Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Static File Serving Middleware
// Serve uploads directory - files accessible via /uploads/*
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve public directory - general static assets
app.use(express.static(path.join(__dirname, 'public')));

// ==================== ROUTES CONFIGURATION ====================

// Consolidated API Routes
app.use('/api/v1', Routes);

// Default/Root Route
app.get('/', (req, res) => {
  res.send('Hello from logic_vhai server :)');
});

// ==================== ERROR HANDLING MIDDLEWARE ====================

// Route Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong on the server',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

// ==================== SERVER INITIALIZATION ====================

// Immediately Invoked Function Expression (IIFE) to start the server
(async () => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(
        `> Server is up and running on: http://localhost:${port}`.rainbow
          .bgWhite
      );
    });
  } catch (error) {
    console.error(`Failed to start the server: ${error.message}`.underline.red);
    process.exit(1);
  }
})();

