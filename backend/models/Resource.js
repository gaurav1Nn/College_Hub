// models/Resource.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true }, // Firebase storage URL
    createdBy: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        username: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now },
    tags: { type: [String], required: true } // Tags for searching resources
});

module.exports = mongoose.model('Resource', ResourceSchema);
