const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user and get JWT token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/profile
// @desc    Get current logged-in user's profile
// @access  Private (JWT required)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
