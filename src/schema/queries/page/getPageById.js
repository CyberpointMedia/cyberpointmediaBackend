const { GraphQLString, GraphQLNonNull } = require('graphql'); // Ensure correct import
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');

const getPageById = {
  type: PageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) } // Use GraphQLNonNull correctly
  },
  resolve: async (parent, args) => {
    try {
      const page = await Page.findById(args.id);
      if (!page) {
        throw new Error('Page not found');
      }
      return page;
    } catch (error) {
      throw new Error(`Error fetching page by ID: ${error.message}`);
    }
  }
};

module.exports = getPageById;
