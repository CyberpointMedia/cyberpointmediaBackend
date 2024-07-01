//src/resolvers/users/deleteUser.js
const User = require('../../models/User');

const deleteUser = async (_, { id }) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  await user.remove();
  return {
    message: 'User deleted successfully'
  };
};

module.exports = deleteUser;
