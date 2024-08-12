// src/types/DashboardType.js
const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const DashboardType = new GraphQLObjectType({
  name: 'Dashboard',
  fields: {
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    loginTime: { type: GraphQLString },
    logoutTime: { type: GraphQLString },
    location: { type: GraphQLString },
  },
});

module.exports = DashboardType;
