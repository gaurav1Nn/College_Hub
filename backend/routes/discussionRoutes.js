const express = require('express');
const router = express.Router();
const { getDiscussions, createDiscussion, addComment } = require('../controllers/discussionController');
const authMiddleware = require('../middleware/authMiddleware');


// Get all discussions or search by title
router.get('/', getDiscussions);

// Create a new discussion
router.post('/', authMiddleware, createDiscussion);

// Add a comment to a discussion
router.post('/:discussionId/comments', authMiddleware, addComment);

module.exports = router;
