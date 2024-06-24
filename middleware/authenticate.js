const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const payload = jsonwebtoken.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
