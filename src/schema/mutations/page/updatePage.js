const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const User = require('../../../models/User');
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
  resolve: authMiddleware(async (parent, args, context) => {
    // Ensure user is authenticated
    if (!context.user) {
      throw new Error('User is not authenticated');
    }

    // Find the user by their email to get their _id
    const user = await User.findOne({ email: context.user.email });
    if (!user) {
      throw new Error('User not found');
    }
    try {

      // Check if page exists
      const existingPage = await Page.findById(args.id);
      if (!existingPage) {
        throw new Error('Page not found');
      }

      // Update the page with the provided fields
      const updatedPage = await Page.findByIdAndUpdate(args.id, {
        ...args,
        author: user._id
      }, { new: true });

      if (!updatedPage) {
        throw new Error('Error updating page');
      }
 // Fetch the full user details
      const fullUserDetails = await User.findById(user._id);

// Return the updated page with full author details
return {
  ...updatedPage._doc,
  author: fullUserDetails
};
    } catch (error) {
      throw new Error(`Error updating page: ${error.message}`);
    }
  })
};

module.exports = updatePage;
