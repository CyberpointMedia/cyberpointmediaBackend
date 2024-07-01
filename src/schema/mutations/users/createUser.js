// src/schema/mutations/createUser.js
const { GraphQLNonNull, GraphQLString } = require('graphql');
const UserType = require('../../types/UserType');
const User = require('../../../models/User');
const authMiddleware = require('../../../auth/authMiddleware');

const createUser = {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    website: { type: GraphQLString },
    role: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: authMiddleware(async (_, { username, email, password, website, role }) => {
    const user = new User({ username, email, password, website, role });
    await user.save();
    return user;
  })
};

module.exports = createUser;
