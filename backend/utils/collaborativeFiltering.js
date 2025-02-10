const User = require('../models/User');
const Post = require('../models/Post');

// Function to calculate cosine similarity
const cosineSimilarity = (vecA, vecB) => {
    // Check if both vectors are arrays and have the same length
    if (!Array.isArray(vecA) || !Array.isArray(vecB) || vecA.length !== vecB.length) {
        console.error('Invalid vectors provided to cosineSimilarity:', { vecA, vecB });
        return 0;
    }

    const dotProduct = vecA.reduce((sum, value, index) => sum + value * vecB[index], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, value) => sum + value * value, 0));

    return (magnitudeA && magnitudeB) ? dotProduct / (magnitudeA * magnitudeB) : 0;
};


// Fetch posts and users
const fetchPosts = async () => {
    return await Post.find(); // Fetch all posts from the database
};

const fetchUsers = async () => {
    return await User.find(); // Fetch all users from the database
};

// Create user-post interaction matrix
const createUserPostMatrix = async () => {
    const posts = await fetchPosts();
    const users = await fetchUsers();

    const userPostMatrix = {};

    // Initialize the matrix
    users.forEach(user => {
        userPostMatrix[user._id] = new Array(posts.length).fill(0); // Set all interactions to 0
    });

    // Populate the matrix based on likes
    users.forEach(user => {
        user.likedPosts.forEach(postId => {
            const postIndex = posts.findIndex(post => post._id.toString() === postId.toString());
            if (postIndex !== -1) {
                userPostMatrix[user._id][postIndex] = 1; // "Like" interaction
            }
        });
    });

    return { userPostMatrix, posts };
};

// Calculate cosine similarities for user-user pairs
const calculateUserSimilarities = (userPostMatrix, targetUserId) => {
    const similarities = {};
    const userIds = Object.keys(userPostMatrix);
    console.log(targetUserId);
    
    for (let i = 0; i < userIds.length; i++) {
        const otherUserId = userIds[i];

        // Skip comparison with the same user
        if (otherUserId !== targetUserId) {
            similarities[otherUserId] = cosineSimilarity(userPostMatrix[targetUserId], userPostMatrix[otherUserId]);
        }
    }

    // Sort users based on similarity score in descending order
    const sortedSimilarUsers = Object.entries(similarities).sort((a, b) => b[1] - a[1]);

    return sortedSimilarUsers;
};

// Generate recommendations for the target user
const recommendPosts = async (userId) => {
    const { userPostMatrix, posts } = await createUserPostMatrix();

    // Get sorted similar users based on similarity score with the target user
    const sortedSimilarUsers = calculateUserSimilarities(userPostMatrix, userId);
    console.log(sortedSimilarUsers);
    

    const targetUserLikedPosts = new Set(userPostMatrix[userId].map((liked, postIndex) => liked === 1 ? posts[postIndex]._id.toString() : null).filter(Boolean));

    const recommendedPosts = new Set(); // To avoid duplicates

    // Iterate through sorted similar users and gather distinct posts they've liked but the target user hasn't
    for (const [similarUserId, similarityScore] of sortedSimilarUsers) {
        const likedPosts = userPostMatrix[similarUserId];

        likedPosts.forEach((liked, postIndex) => {
            const postId = posts[postIndex]._id.toString();
            // If similar user liked the post and target user hasn't, add it to recommendations
            if (liked === 1 && !targetUserLikedPosts.has(postId)) {
                recommendedPosts.add(postId);
            }

            // Stop once we have 10 recommendations
            if (recommendedPosts.size >= 10) return Array.from(recommendedPosts);
        });
    }

    return Array.from(recommendedPosts); // Return the recommended post IDs
};

module.exports = {
    recommendPosts
};
