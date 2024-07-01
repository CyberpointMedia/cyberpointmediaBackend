// src/schema/types/MessageType.js
const { GraphQLObjectType, GraphQLString } = require('graphql');

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    message: { type: GraphQLString }
  }
});

module.exports = MessageType;
