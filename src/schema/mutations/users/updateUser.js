// src/schema/mutations/updateUser.js
const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
const UserType = require('../../types/UserType');
const User = require('../../../models/User');
const authMiddleware = require('../../../auth/authMiddleware');

const updateUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    website: { type: GraphQLString },
    role: { type: GraphQLString }
  },
  resolve: authMiddleware(async (_, { id, username, email, password, website, role }) => {
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (website) updateData.website = website;
    if (role) updateData.role = role;

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  })
};

module.exports = updateUser;
