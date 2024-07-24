// src/schema/types/UserType.js
const { GraphQLObjectType, GraphQLID ,GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID, resolve: (user) => user._id.toString() },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    website: { type: GraphQLString },
    role: { type: GraphQLString }
  }
});

module.exports = UserType;
