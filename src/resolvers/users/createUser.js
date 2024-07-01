//src/resolvers/users/createUser.js
const User = require('../../models/User');

const createUser = async (_, { username, email, password, website, role }) => {
  const user = new User({ username, email, password, website, role });
  await user.save();
  return user;
};

module.exports = createUser;
