const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const authMiddleware = require('../../../auth/authMiddleware');

const updatePage = {
  type: PageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }, // ID of the page to update
    page_name: { type: GraphQLString },
    page_router: { type: GraphQLString },
    sub_description: { type: GraphQLString },
    description: { type: GraphQLString },
    seoTitle: { type: GraphQLString },
    metaDescription: { type: GraphQLString },
    breadcrumbsTitle: { type: GraphQLString },
    canonicalURL: { type: GraphQLString },
    searchEngines: { type: new GraphQLList(GraphQLString) },
    hsRadioGroup: { type: GraphQLString },
    metaRobots: { type: GraphQLString },
    status: { type: GraphQLString }
  },
  resolve: authMiddleware(async (parent, args) => {
    try {
      const updatedPage = await Page.findByIdAndUpdate(args.id, args, { new: true });
      if (!updatedPage) {
        throw new Error('Page not found');
      }
      return updatedPage;
    } catch (error) {
      throw new Error(`Error updating page: ${error.message}`);
    }
  })
};

module.exports = updatePage;
