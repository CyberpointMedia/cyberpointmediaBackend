// src/schema/queries/allUsers.js
const { GraphQLList } = require('graphql');
const UserType = require('../../types/UserType');
const User = require('../../../models/User');
const authMiddleware = require('../../../auth/authMiddleware');

const allUsers = {
  type: new GraphQLList(UserType),
  resolve: authMiddleware(async () => {
    return await User.find({});
  })
};

module.exports = allUsers;
