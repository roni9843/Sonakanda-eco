// controllers/post.controller.js
const Post = require('../models/Post.model');
const Story = require('../models/Story.model');
const { sendSuccess, sendError } = require('../utils/response');
const path = require('path');




// Create Post with images (use multer or cloudinary in real app - here assuming images are URLs)
// Create Post with images
const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { content } = req.body;

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    if (!content?.trim() && imageUrls.length === 0) {
      return sendError(res, 400, 'পোস্টে কিছু লিখুন বা ছবি যোগ করুন।');
    }

    const post = await Post.create({
      user: userId,
      content: content?.trim() || '',
      images: imageUrls,
    });

    await post.populate('user', 'name_bn name_en mobile_number');
    return sendSuccess(res, { statusCode: 201, message: 'পোস্ট হয়েছে!', data: post });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'পোস্ট করতে সমস্যা হয়েছে');
  }
};



// Like/Unlike Post
const toggleLike = async (req, res) => {
  try {
    const userId = req.user.userId;
    const post = await Post.findById(req.params.id);

    if (!post) return sendError(res, 404, 'পোস্ট পাওয়া যায়নি');

    const likedIndex = post.likes.findIndex((id) => id.toString() === userId);

    if (likedIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likedIndex, 1);
    }

    await post.save();
    await post.populate('user', 'name_bn name_en mobile_number');

    return sendSuccess(res, { data: post });
  } catch (err) {
    return sendError(res, 500, 'লাইক করতে সমস্যা');
  }
};

// Add Comment
const addComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return sendError(res, 404, 'পোস্ট পাওয়া যায়নি');
    if (!text?.trim()) return sendError(res, 400, 'কমেন্ট লিখুন');

    post.comments.push({
      user: userId,
      text: text.trim(),
    });

    await post.save();
    await post.populate('comments.user', 'name_bn name_en mobile_number');
    await post.populate('user', 'name_bn name_en mobile_number');

    return sendSuccess(res, { data: post });
  } catch (err) {
    return sendError(res, 500, 'কমেন্ট করতে সমস্যা');
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name_bn name_en mobile_number')
      .populate('comments.user', 'name_bn name_en mobile_number');

    return sendSuccess(res, { data: posts });
  } catch (err) {
    return sendError(res, 500, 'পোস্ট লোড করতে সমস্যা');
  }
};

// Create Story
// Create Story
const createStory = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return sendError(res, 400, 'ছবি দিন');
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const story = await Story.create({
      user: userId,
      image: imageUrl,
    });

    await story.populate('user', 'name_bn name_en mobile_number');
    return sendSuccess(res, { statusCode: 201, data: story });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, 'স্টোরি আপলোড সমস্যা');
  }
};

// Get Active Stories
const getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate('user', 'name_bn name_en mobile_number')
      .sort({ createdAt: -1 });

    return sendSuccess(res, { data: stories });
  } catch (err) {
    return sendError(res, 500, 'স্টোরি লোড সমস্যা');
  }
};

module.exports = {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
  createStory,
  getStories,
};