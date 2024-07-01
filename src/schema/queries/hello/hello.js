// src/schema/queries/hello.js
const { GraphQLString } = require('graphql');

const hello = {
  type: GraphQLString,
  resolve: () => 'Hello, world!'
};

module.exports = hello;
