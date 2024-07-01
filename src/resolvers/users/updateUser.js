//src/resolvers/users/updateUser.js
const User = require('../../models/User');

const updateUser = async (_, { id, username, email, password, website, role }) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  if (username !== undefined) user.username = username;
  if (email !== undefined) user.email = email;
  if (password !== undefined) user.password = password;
  if (website !== undefined) user.website = website;
  if (role !== undefined) user.role = role;

  await user.save();
  return user;
};

module.exports = updateUser;
