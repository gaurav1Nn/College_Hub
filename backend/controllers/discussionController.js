const Discussion = require('../models/Discussion');
const User = require('../models/User');
const mongoose = require('mongoose');

// Get all discussions or search by title
exports.getDiscussions = async (req, res) => {
    const { search } = req.query;
    console.log(search);
    console.log("searching...");
    
    try {
        let discussions;
        if (search) {
            console.log(search);
            
            discussions = await Discussion.find({
                title: { $regex: search, $options: 'i' }  // Search case-insensitively
            }).sort({ createdAt: -1 });
        } else {
            discussions = await Discussion.find({}).sort({ createdAt: -1 });
            console.log("this is wprking");
            
        }

        res.json(discussions);
    } catch (err) {
        console.error("Error Fetching Discussions:", err.message);
        res.status(500).json({ message: "Error Fetching Discussions" });
    }
};

// Create a new discussion
exports.createDiscussion = async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        const user = await User.findById(req.user.id); // Get user info from the database
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newDiscussion = new Discussion({
            title,
            content,
            tags,
            createdBy: {
                id: user._id,  // Use user ID from the logged-in user
                username: user.username // Use username from the logged-in user
            }
        });

        await newDiscussion.save();
        res.json(newDiscussion);
    } catch (err) {
        console.error("Error Creating Discussion:", err.message);
        res.status(500).json({ message: "Error Creating Discussion" });
    }
};

// Add a comment to a discussion
exports.addComment = async (req, res) => {
    const { text } = req.body;
    const { discussionId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(discussionId)) {
            return res.status(400).json({ message: "Invalid Discussion ID" });
        }

        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not Found" });
        }

        const user = await User.findById(req.user.id);  // Get user info from the database
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newComment = {
            text,
            createdBy: {
                id: user._id,  // Add user ID to the comment
                username: user.username // Add username to the comment
            }
        };

        discussion.comments.push(newComment);
        await discussion.save();

        res.json(discussion);
    } catch (err) {
        console.error("Error Adding Comment:", err.message);
        res.status(500).json({ message: "Error Adding Comment" });
    }
};
