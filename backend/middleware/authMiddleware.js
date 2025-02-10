const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Attach the decoded user information to the request
        req.user = decoded;  // Ensure decoded structure matches your expectations
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
