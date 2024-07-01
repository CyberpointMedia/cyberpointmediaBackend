//src/resolvers/users/allUsers.js
const User = require('../../models/User');

const allUsers = async () => {
  return await User.find();
};

module.exports = allUsers;
