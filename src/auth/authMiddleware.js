// src/auth/authMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (resolve) => {
  return (parent, args, context, info) => {
    const authHeader = context.headers.authorization;
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      context.user = decoded; // Attach the decoded user info to the context
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
    return resolve(parent, args, context, info);
  };
};

module.exports = authMiddleware;
