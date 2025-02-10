const express = require('express');
const router = express.Router();
const { getUserById, getAllUsers } = require('../controllers/userController'); // Update path according to your project structure

// Route to get user by ID
router.get('/:id', getUserById);
router.get('/',getAllUsers);

module.exports = router;
