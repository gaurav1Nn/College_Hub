const User = require('../models/User'); // Update the path according to your project structure

// Fetch user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username handle avatar'); // Fetch only needed fields
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users, select only the required fields
    const users = await User.find().select('username handle likedPosts');
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Server error' });
  }
};