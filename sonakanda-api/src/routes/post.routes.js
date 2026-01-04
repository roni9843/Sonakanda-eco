const express = require('express');
const {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
  createStory,
  getStories,
} = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { uploadMultiple, uploadSingle } = require('../middleware/upload');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/stories', getStories);

// Protected routes
router.post('/', authMiddleware, uploadMultiple, createPost);
router.post('/:id/like', authMiddleware, toggleLike);
router.post('/:id/comment', authMiddleware, addComment);
router.post('/stories', authMiddleware, uploadSingle, createStory);

module.exports = router;