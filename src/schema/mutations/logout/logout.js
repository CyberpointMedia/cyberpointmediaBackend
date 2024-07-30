// src/schema/mutations/logout.js
const MessageType = require('../../types/MessageType');

const logout = {
  type: MessageType,
  resolve: (parent, args, context) => {
    return new Promise((resolve, reject) => {
      if (context.req && context.req.logout) {
        context.req.logout((err) => {
          if (err) {
            reject(new Error('Logout failed'));
          } else {
            context.res.clearCookie('user'); 
            context.res.clearCookie('token');
            // Clear the user session
            context.req.session.destroy((err) => {
              if (err) {
                reject(new Error('Session destruction failed'));
              } else {
                resolve({ message: 'Logged out successfully' });
              }
            });
          }
        });
      } else {
        reject(new Error('Request object is undefined'));
      }
    });
  }
};

module.exports = logout;


