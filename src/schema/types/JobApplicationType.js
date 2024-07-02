// src/schema/types/JobApplicationType.js
const { GraphQLObjectType, GraphQLString } = require('graphql');

const JobApplicationType = new GraphQLObjectType({
  name: 'JobApplication',
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    cv: { type: GraphQLString },
    linkedin: { type: GraphQLString },
    github: { type: GraphQLString },
    others: { type: GraphQLString },
    phone: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

module.exports = JobApplicationType;
