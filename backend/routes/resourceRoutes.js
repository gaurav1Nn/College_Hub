// routes/resources.js
const express = require('express');
const router = express.Router();
const { getResources, createResource } = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

// Get resources (with optional tag search)
router.get('/', getResources);

// Upload a new resource
router.post('/upload', authMiddleware, createResource);

module.exports = router;
