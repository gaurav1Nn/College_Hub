const Resource = require('../models/Resource');
const User = require('../models/User')
// Create a new resource
exports.createResource = async (req, res) => {
    const { name, description, url, tags } = req.body;

    try {
        const user = await User.findById(req.user.id); // Automatically fetch user data
        console.log('Creating');
        
        const newResource = new Resource({
            name,
            description,
            url,
            tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags to array
            createdBy: {
                id: user._id,
                username: user.username
            }
        });

        await newResource.save();
        res.json(newResource);
    } catch (err) {
        console.error("Error Creating Resource:", err.message);
        res.status(500).json({ message: "Error Creating Resource" });
    }
};

// Get all resources
exports.getResources = async (req, res) => {
    const { search } = req.query;

    try {
        let resources;
        if (search) {
            resources = await Resource.find({
                tags: { $regex: search, $options: 'i' }
            }).sort({ createdAt: -1 });
        } else {
            resources = await Resource.find({}).sort({ createdAt: -1 });
        }

        res.json(resources);
    } catch (err) {
        console.error("Error Fetching Resources:", err.message);
        res.status(500).json({ message: "Error Fetching Resources" });
    }
};
