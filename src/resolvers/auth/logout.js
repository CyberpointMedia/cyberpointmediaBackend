//src/resolvers/auth/logout.js
const logout = async (_, args, context) => {
    context.res.setHeader('Authorization', '');
    return {
      message: 'Logged out successfully'
    };
  };
  
  module.exports = logout;
  