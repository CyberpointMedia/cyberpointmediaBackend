//src/schema/mutations/deleteUser.js

const { GraphQLNonNull, GraphQLID } = require('graphql');
const UserType = require('../../types/UserType');
const User = require('../../../models/User');
const authMiddleware = require('../../../auth/authMiddleware');

const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: authMiddleware(async (_, { id }) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  })
};

module.exports = deleteUser;
