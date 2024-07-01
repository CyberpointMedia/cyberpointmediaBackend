//src/resolvers/users/getUserById.js
const User = require('../../models/User');

const getUserById = async (_, { id }) => {
  return await User.findById(id);
};

module.exports = getUserById;
