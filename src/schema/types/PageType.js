const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const UserType = require('./UserType');

const PageType = new GraphQLObjectType({
  name: 'Page',
  fields: () => ({
    id: { type: GraphQLID, resolve: (page) => page._id.toString() },
    page_name: { type: GraphQLString },
    page_router: { type: GraphQLString },
    sub_description: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: UserType },
    seoTitle: { type: GraphQLString },
    metaDescription: { type: GraphQLString },
    breadcrumbsTitle: { type: GraphQLString },
    canonicalURL: { type: GraphQLString },
    searchEngines: { type: new GraphQLList(GraphQLString) },
    hsRadioGroup: { type: GraphQLString },
    metaRobots: { type: GraphQLString },
    status: { type: GraphQLString },
    current_date: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString }
  })
});

module.exports = PageType;
