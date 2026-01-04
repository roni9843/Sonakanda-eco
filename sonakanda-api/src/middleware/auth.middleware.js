const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

/**
 * JWT authentication middleware.
 * Expects Authorization: Bearer <token>
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, {
      statusCode: 401,
      message: 'Authorization token missing',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded payload to request for later use
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verify error:', error.message);
    return sendError(res, {
      statusCode: 401,
      message: 'Invalid or expired token',
    });
  }
};

module.exports = authMiddleware;
