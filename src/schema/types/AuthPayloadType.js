// src/schema/types/AuthPayloadType.js
const { GraphQLObjectType, GraphQLString } = require('graphql');

const AuthPayloadType = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: {
    message: { type: GraphQLString },
    token: { type: GraphQLString },
    role: { type: GraphQLString },
  }
});

module.exports = AuthPayloadType;
