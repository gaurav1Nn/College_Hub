// const mongoose = require("mongoose");

// // Define the Comment schema
// const CommentSchema = new mongoose.Schema({
//     text: { type: String, required: true },
//     createdBy: {
//         _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User ID
//         username: { type: String, required: true } // Username directly stored
//     },
//     createdAt: { type: Date, default: Date.now }
// });

// // Define the Post schema
// const PostSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     tags: [String],
//     likes: { type: Number, default: 0 },
//     createdBy: {
//         _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User ID
//         username: { type: String, required: true } // Username directly stored
//     },
//     createdAt: { type: Date, default: Date.now },
//     comments: [CommentSchema] // Embedded comments schema
// });

// // Export the Post model
// module.exports = mongoose.model('Post', PostSchema);

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    createdBy: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [{
        text: { type: String },
        createdBy: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String },
        },
        createdAt: { type: Date, default: Date.now },
    }]
});

module.exports = mongoose.model('Post', PostSchema);
