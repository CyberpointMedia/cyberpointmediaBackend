// src/schema/queries/getUserById.js
const { GraphQLNonNull, GraphQLID } = require('graphql');
const UserType = require('../../types/UserType');
const User = require('../../../models/User');
const authMiddleware = require('../../../auth/authMiddleware');

const getUserById = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: authMiddleware(async (_, { id }) => {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  })
};

module.exports = getUserById;
