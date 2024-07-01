//src/schema/types/CareerType.js
const { GraphQLObjectType, GraphQLString } = require('graphql');

const CareerType = new GraphQLObjectType({
  name: 'Career',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    skills: { type: GraphQLString },
    location: { type: GraphQLString },
    experience: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
  },
});

module.exports = CareerType;
