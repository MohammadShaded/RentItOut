import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after "Bearer"

    if (!token) {
        // If no token is provided, deny access
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If token is invalid or expired, deny access
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        // If the token is valid, add user info to the request object
        req.user = user;
        next(); // Move to the next middleware or route handler
    });
};

export default authenticateToken;