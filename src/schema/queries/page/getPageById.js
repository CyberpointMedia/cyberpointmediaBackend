const { GraphQLString, GraphQLNonNull } = require('graphql'); // Ensure correct import
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const User = require('../../../models/User'); // Import User model

const getPageById = {
  type: PageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) } // Ensure ID is required and of type GraphQLString
  },
  resolve: async (parent, args) => {
    try {
      // Convert ID to ObjectId if necessary
      const pageId = args.id; // Convert to ObjectId if needed

      // Find the page by ID
      const page = await Page.findById(pageId);
      if (!page) {
        throw new Error('Page not found');
      }

      // Fetch author details if an author exists
      let authorDetails = null;
      if (page.author) {
        try {
          authorDetails = await User.findById(page.author); // Fetch author details
          if (!authorDetails) {
            console.warn(`Author not found for page: ${pageId}`);
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
      // Handle errors related to database operations or invalid ID
      throw new Error(`Error fetching page by ID: ${error.message}`);
    }
  }
};

module.exports = getPageById;
