const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');
const { recommendPosts } = require('../utils/collaborativeFiltering');

// Create Post
exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        // Check if the user ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const user = await User.findById(req.user.id);

        // Validate user existence
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.create({
            title,
            content,
            tags,
            createdBy: {
                id: user._id,
                username: user.username
            }
        });

        res.status(201).json(post);  // Return created post with 201 status
    } catch (err) {
        console.error("Error Creating Post:", err);  // Log the error object
        res.status(500).json({ message: "Error Creating Post" });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('createdBy.id', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.log("Error fetching Posts:", err.message);
        res.status(500).json({ message: "Error fetching Posts" });
    }
};

// Like a Post
exports.likePost = async (req, res) => {
    const { postId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const post = await Post.findById(postId);
        const user = await User.findById(req.user.id);

        if (!post) {
            return res.status(404).json({ message: "Post not Found" });
        }

        // Increment like count
        if (!user.likedPosts.includes(postId)) {
            post.likes += 1;
            user.likedPosts.push(postId);

            // Extract tags, convert to lowercase and add them to preferences
            const postTags = post.tags.map(tag => tag.toLowerCase());
            user.preferences = [...new Set([...user.preferences, ...postTags])];
        } else {
            return res.status(400).json({ message: "User already liked the Post" });
        }

        await post.save();
        await user.save();

        res.json(post);
    } catch (err) {
        console.log("Error Liking Post:", err.message);
        res.status(500).json({ message: "Error Liking Post" });
    }
};


// Add Comment
exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const post = await Post.findById(postId);
        const user = await User.findById(req.user.id);

        if (!post) {
            return res.status(404).json({ message: "Post not Found" });
        }

        // Create a comment with both userID and username
        const comment = {
            text,
            createdBy: {
                id: user._id,
                username: user.username
            }
        };

        post.comments.push(comment);
        await post.save();
        res.json(post);
    } catch (err) {
        console.log("Error Adding Comment:", err.message);
        res.status(500).json({ message: "Error Adding Comment" });
    }
};

// Get comments for a post
exports.getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const post = await Post.findById(postId).populate('comments.createdBy.id', 'username');

        if (!post) {
            return res.status(404).json({ message: "Post not Found" });
        }

        res.json(post.comments);
    } catch (err) {
        console.log("Error fetching Comments:", err.message);
        res.status(500).json({ message: "Error fetching Comments" });
    }
};

// Recommend Post Based on interactions (likes) || Content Based Recommendations (filtering)
exports.getRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('likedPosts');

        if (!user) {
            return res.status(404).json({ message: 'User not Found' });
        }

        // Lowercase the user's preferences to handle case insensitivity
        const userPreferences = user.preferences.map(tag => tag.toLowerCase());

        // Find posts with similar tags (case-insensitive match), exclude liked and user's own posts
        const recommendedPosts = await Post.find({
            tags: { $in: userPreferences },
            _id: { $nin: user.likedPosts },
            'createdBy.id': { $ne: user._id }
        }).sort({ createdAt: -1 });

        res.json(recommendedPosts);
    } catch (err) {
        console.log("Error Fetching Recommendations:", err.message);
        res.status(500).json({ message: "Error Fetching Recommendations" });
    }
};

//get post details based on an array of post IDs
exports.getPostDetails = async (req, res) => {
    try {
        const { postIds } = req.body; // Get the array of post IDs from the request body

        if (!postIds || postIds.length === 0) {
            return res.status(400).json({ error: 'Post IDs are required' });
        }

        // Fetch the posts that match the provided post IDs
        const posts = await Post.find({ _id: { $in: postIds } });

        // If no posts found, return a message
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for the provided IDs' });
        }

        // Return the fetched posts
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).json({ error: 'Failed to fetch post details' });
    }
}

// Code for Collaborative filtering
exports.getCollaborativeRecommendations = async (req, res) => {
        try {
            const user = req.user; // Assuming the authenticated user is available on req.user
            if (!user) {
                return res.status(401).json({ message: 'User not authenticated' });
            }
            console.log(user);
            
    
            // Step 1: Get recommended post IDs for the user
            const recommendedPostIds = await recommendPosts(user.id);
            
            // Step 2: Fetch the posts using the recommended post IDs
            const posts = await Post.find({ _id: { $in: recommendedPostIds } }).sort({ createdAt: -1 });
    
            // Step 3: Send the fetched posts to the client
            res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching collaborative recommendations:', error);
            res.status(500).json({ message: 'Failed to get collaborative recommendations' });
        }
}

exports.getHybridRecommendations = async (req, res) => {
    try {
        const user = req.user; // Assuming the authenticated user is available on req.user
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Get recommendations from collaborative filtering
        const recommendedPostIdsCollaborative = await recommendPosts(user.id);
        const collaborativePosts = await Post.find({ _id: { $in: recommendedPostIdsCollaborative } }).sort({ createdAt: -1 });

        // Get recommendations from content-based filtering
        const userFromDB = await User.findById(req.user.id).populate('likedPosts');
        if (!userFromDB) {
            return res.status(404).json({ message: 'User not Found' });
        }

        // Lowercase the user's preferences for case-insensitive match
        const userPreferences = userFromDB.preferences.map(tag => tag.toLowerCase());
        const contentBasedPosts = await Post.find({
            tags: { $in: userPreferences },
            _id: { $nin: userFromDB.likedPosts },
            'createdBy.id': { $ne: userFromDB._id }
        }).sort({ createdAt: -1 });

        // Merge both arrays and remove duplicates
        const combinedPosts = [ ...contentBasedPosts, ...collaborativePosts];
        
        // Use a Set to store unique post IDs and filter out duplicates
        const uniquePosts = Array.from(new Set(combinedPosts.map(post => post._id.toString())))
            .map(id => combinedPosts.find(post => post._id.toString() === id));

        // Return the final response with unique posts
        res.status(200).json(uniquePosts);
    } catch (error) {
        console.error('Error fetching hybrid recommendations:', error);
        res.status(500).json({ message: 'Failed to get hybrid recommendations' });
    }
};
