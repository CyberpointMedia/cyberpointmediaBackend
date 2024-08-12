// src/schema/mutations/logout.js
const MessageType = require('../../types/MessageType');
const Dashboard = require('../../../models/Dashboard'); // Import the Dashboard model
const User = require('../../../models/User'); // Import the User model
const authMiddleware = require('../../../auth/authMiddleware');
const logout = {
  type: MessageType,
  resolve: authMiddleware(async (parent, args, context) => {
    // Log context for debugging
    console.log('Context:', context);

    if (context.user) {
      const user = context.user; // Use context.user from authMiddleware
      console.log('User:', user);
      
      // Retrieve the user from the database using the email
      const dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        throw new Error('User not found');
      }
      const userId = dbUser._id;
      console.log('User ID:', userId);

      return new Promise((resolve, reject) => {
      context.req.logout(async (err) => {
        if (err) {
          return reject(new Error('Logout failed', err));
        } else {
          // Log after logout
          console.log('User after logout:', context.user);

          // Update the logout time in the Dashboard
          try {
            
            await Dashboard.findOneAndUpdate(
              { user: userId, logoutTime: { $exists: false } }, // Find the last login entry without a logout time
              { logoutTime: new Date() },
              { new: true }
            );
            console.log('Dashboard updated successfully');
          } catch (error) {
            console.error('Error updating Dashboard:', error);
            throw new Error('Failed to update Dashboard');
          }

          // Clear cookies
          context.res.clearCookie('user');
          context.res.clearCookie('token');

          // Clear the user session
          context.req.session.destroy((err) => {
            if (err) {
              return reject(new Error('Session destruction failed'));
            } else {
              return resolve({ message: 'Logged out successfully' });
            }
          });
        }
      });
    });
    } else {
      throw new Error('Request object is undefined');
    }
  })
};

module.exports = logout;