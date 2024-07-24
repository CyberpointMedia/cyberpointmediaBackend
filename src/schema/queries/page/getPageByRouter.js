const { GraphQLString } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const User = require('../../../models/User'); // Import User model

const getPageByRouter = {
  type: PageType,
  args: {
    page_router: { type: GraphQLString } // Ensure correct type for page_router
  },
  resolve: async (parent, args) => {
    try {
      // Find the page by page_router
      const page = await Page.findOne({ page_router: args.page_router });
      if (!page) {
        throw new Error('Page not found');
      }

      // Fetch author details if an author exists
      let authorDetails = null;
      if (page.author) {
        try {
          authorDetails = await User.findById(page.author); // Fetch author details
          if (!authorDetails) {
            console.warn(`Author not found for page with router: ${args.page_router}`);
          }
        } catch (err) {
          console.error(`Error fetching author details: ${err.message}`);
        }
      }

      // Return the page with author details
      return {
        ...page._doc,
        author: authorDetails ? {
          _id: authorDetails._id ? authorDetails._id.toString() : null, // Ensure author ID is converted to string
          username: authorDetails.username,
          email: authorDetails.email,
          website: authorDetails.website,
          role: authorDetails.role
        } : null
      };
    } catch (error) {
      // Handle errors related to database operations or invalid router
      throw new Error(`Error fetching page by router: ${error.message}`);
    }
  }
};

module.exports = getPageByRouter;
