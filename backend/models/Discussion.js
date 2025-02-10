const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Question or Discussion Title
    content: { type: String, required: true },  // Detailed Question or Description
    tags: [{ type: String }],  // Tags related to the question
    createdBy: {  // User who posted the question
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String }
    },
    createdAt: { type: Date, default: Date.now },  // Timestamp
    comments: [{  // Comments array within the discussion
        text: { type: String },
        createdBy: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String }
        },
        createdAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
