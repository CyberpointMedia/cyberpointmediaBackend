// src/schema/types/PostType.js
const { GraphQLObjectType, GraphQLString,GraphQLID, GraphQLList } = require('graphql');
const UserType = require('./UserType');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID, resolve: (post) => post._id.toString() },
    post_name: { type: GraphQLString },
    post_router: { type: GraphQLString },
    sub_description: { type: GraphQLString },
    description: { type: GraphQLString },
    feature_img: { type: GraphQLString },
    picture_img: { type: GraphQLString },
    status: { type: GraphQLString },
    author: { type: UserType },
    seotitle: { type: GraphQLString },
    seometadescription: { type: GraphQLString },
    breadcrumbsTitle: { type: GraphQLString },
    canonicalURL: { type: GraphQLString },
    searchEngines: { type: new GraphQLList(GraphQLString) },
    hsRadioGroup: { type: GraphQLString },
    metaRobots: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    updated_date: { type: GraphQLString }
  })
});

module.exports = PostType;
