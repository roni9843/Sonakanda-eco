const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const { sendSuccess } = require('./utils/response');

const app = express();

// Built-in middleware to parse JSON request body
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// CORS configuration to allow frontend at http://localhost:5173
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://roni9843.github.io'],
  }),
);

// Simple health check route
app.get('/api/health', (req, res) => {
  return sendSuccess(res, { message: 'Sonakanda backend API is running' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Post (news feed) routes
app.use('/api/posts', postRoutes);

// Not found handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

module.exports = app;
