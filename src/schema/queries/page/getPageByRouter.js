const { GraphQLString } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');

const getPageByRouter = {
  type: PageType,
  args: {
    page_router: { type: GraphQLString }
  },
  resolve: async (parent, args) => {
    try {
      const page = await Page.findOne({ page_router: args.page_router });
      if (!page) {
        throw new Error('Page not found');
      }
      return page;
    } catch (error) {
      throw new Error(`Error fetching page by router: ${error.message}`);
    }
  }
};

module.exports = getPageByRouter;
