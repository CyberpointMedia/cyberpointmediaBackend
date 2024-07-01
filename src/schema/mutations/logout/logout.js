// src/schema/mutations/logout.js
const MessageType = require('../../types/MessageType');

const logout = {
  type: MessageType,
  resolve: () => {
    // Implement your logout logic here
    return { message: 'Logged out successfully' };
  }
};

module.exports = logout;
