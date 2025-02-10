import axios from 'axios';

// Fetch posts and users
export const fetchPosts = async () => {
    const response = await axios.get('http://localhost:5000/api/posts');
    return response.data;
};

export const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
};

// Function to calculate cosine similarity
const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, value, index) => sum + value * vecB[index], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, value) => sum + value * value, 0));

    return (magnitudeA && magnitudeB) ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

// Create user-post interaction matrix
export const createUserPostMatrix = async () => {
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
            const postIndex = posts.findIndex(post => post._id === postId);
            if (postIndex !== -1) {
                userPostMatrix[user._id][postIndex] = 1; // "Like" interaction
            }
        });
    });
    console.log(userPostMatrix);
    

    return { userPostMatrix, posts };
};

// Calculate cosine similarities for user-user pairs
export const calculateCosineSimilarities = (userPostMatrix) => {
    const similarities = {};
    const userIds = Object.keys(userPostMatrix);

    for (let i = 0; i < userIds.length; i++) {
        for (let j = 0; j < userIds.length; j++) {
            if (i !== j) {
                const user1 = userIds[i];
                const user2 = userIds[j];

                // Calculate cosine similarity between user1 and user2
                similarities[`${user1}-${user2}`] = cosineSimilarity(userPostMatrix[user1], userPostMatrix[user2]);
            }
        }
    }
    console.log(similarities);
    

    return similarities;
};

// Calculate cosine similarity for a specific user with all other users
export const calculateUserSimilarities = (userPostMatrix, targetUserId) => {
    const similarities = {};
    const userIds = Object.keys(userPostMatrix);

    for (let i = 0; i < userIds.length; i++) {
        const otherUserId = userIds[i];

        // Skip comparison with the same user
        if (otherUserId !== targetUserId) {
            similarities[otherUserId] = cosineSimilarity(userPostMatrix[targetUserId], userPostMatrix[otherUserId]);
        }
    }

    // Sort users based on similarity score in descending order
    const sortedSimilarUsers = Object.entries(similarities).sort((a, b) => b[1] - a[1]);
    console.log(sortedSimilarUsers);
    

    return sortedSimilarUsers;
};

// Generate recommendations for the target user
export const recommendPosts = async (userId) => {
    const { userPostMatrix, posts } = await createUserPostMatrix();

    // Get sorted similar users based on similarity score with the target user
    const sortedSimilarUsers = calculateUserSimilarities(userPostMatrix, userId);

    const targetUserLikedPosts = new Set(userPostMatrix[userId].map((liked, postIndex) => liked === 1 ? posts[postIndex]._id : null).filter(Boolean));

    const recommendedPosts = new Set(); // To avoid duplicates

    // Iterate through sorted similar users and gather distinct posts they've liked but the target user hasn't
    for (const [similarUserId, similarityScore] of sortedSimilarUsers) {
        const likedPosts = userPostMatrix[similarUserId];

        likedPosts.forEach((liked, postIndex) => {
            const postId = posts[postIndex]._id;
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

