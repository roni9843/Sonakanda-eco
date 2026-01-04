const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * POST /api/auth/register
 * Register a new user.
 */
const registerUser = async (req, res) => {
  try {
    const {
      name_en,
      nid_number,
      mobile_number,
      password,
      name_bn,
      date_of_birth,
      emergency_mobile_number,
      blood_group,
      birthplace,
      father_name,
      mother_name,
      permanent_address,
      school_or_college_name,
      current_profession,
    } = req.body;

    // Basic required field validation
    if (!name_en || !nid_number || !mobile_number || !password) {
      return sendError(res, {
        statusCode: 400,
        message: 'Missing required fields',
        errors: {
          name_en: !name_en ? 'name_en is required' : undefined,
          nid_number: !nid_number ? 'nid_number is required' : undefined,
          mobile_number: !mobile_number ? 'mobile_number is required' : undefined,
          password: !password ? 'password is required' : undefined,
        },
      });
    }

    // Check for existing user with same mobile or NID
    const existing = await User.findOne({
      $or: [{ mobile_number }, { nid_number }],
    });

    if (existing) {
      let message = 'User already exists with provided credentials';
      const errors = {};
      if (existing.mobile_number === mobile_number) {
        errors.mobile_number = 'Mobile number already in use';
      }
      if (existing.nid_number === nid_number) {
        errors.nid_number = 'NID number already in use';
      }
      return sendError(res, { statusCode: 409, message, errors });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name_en,
      nid_number,
      mobile_number,
      password: hashedPassword,
      name_bn,
      date_of_birth,
      emergency_mobile_number,
      blood_group,
      birthplace,
      father_name,
      mother_name,
      permanent_address,
      school_or_college_name,
      current_profession,
    });

    // thanks to toJSON override, password is removed
    return sendSuccess(res, {
      statusCode: 201,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    console.error('Register error:', error);
    return sendError(res, {
      statusCode: 500,
      message: 'Failed to register user',
    });
  }
};

/**
 * POST /api/auth/login
 * Login using mobile_number and password.
 */
const loginUser = async (req, res) => {
  try {
    const { mobile_number, password } = req.body;

    if (!mobile_number || !password) {
      return sendError(res, {
        statusCode: 400,
        message: 'mobile_number and password are required',
      });
    }

    const user = await User.findOne({ mobile_number });

    if (!user) {
      return sendError(res, {
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return sendError(res, {
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    // Sanitize user output
    const safeUser = user.toJSON();

    return sendSuccess(res, {
      message: 'Login successful',
      data: {
        token,
        user: safeUser,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return sendError(res, {
      statusCode: 500,
      message: 'Failed to login user',
    });
  }
};

/**
 * GET /api/auth/profile
 * Get current authenticated user's profile.
 * req.user is populated by auth middleware.
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.userId;

    if (!userId) {
      return sendError(res, {
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return sendError(res, {
        statusCode: 404,
        message: 'User not found',
      });
    }

    return sendSuccess(res, {
      message: 'Profile fetched successfully',
      data: user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return sendError(res, {
      statusCode: 500,
      message: 'Failed to fetch profile',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
