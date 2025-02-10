const express = require('express')

const {createPost, getPosts, likePost, addComment, getComments, getRecommendations, getPostDetails, getCollaborativeRecommendations, getHybridRecommendations} = require('../controllers/postController')

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// create new post
router.post('/',authMiddleware,createPost);

//get all posts
router.get('/', getPosts);

// like a post
router.post('/like', authMiddleware, likePost);

//add a comment
router.post('/:postId/comment', authMiddleware, addComment);

//get comments
router.get('/:postId/comments', getComments);

//get contentbased Recommendations
router.get('/recommendations',authMiddleware,getRecommendations);

// Route to get post details based on an array of post IDs
router.post('/details', getPostDetails);

//collaborative filtering
router.get('/collaborative',authMiddleware,  getCollaborativeRecommendations);

//Hybrid posts
router.get('/hybrid', authMiddleware, getHybridRecommendations);
module.exports = router;