const { GraphQLString, GraphQLNonNull } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const authMiddleware = require('../../../auth/authMiddleware');

const deletePage = {
  type: PageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) } // ID of the page to delete
  },
  resolve: authMiddleware(async (parent, args) => {
    try {
      const deletedPage = await Page.findByIdAndDelete(args.id);
      if (!deletedPage) {
        throw new Error('Page not found');
      }
      return deletedPage;
    } catch (error) {
      throw new Error(`Error deleting page: ${error.message}`);
    }
  })
};

module.exports = deletePage;
