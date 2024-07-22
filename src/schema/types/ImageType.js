const { GraphQLObjectType, GraphQLString } = require('graphql');

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: {
    url: { type: GraphQLString },
    id: { type: GraphQLString },
  }
});

module.exports = ImageType;
