const { GraphQLString, GraphQLList , GraphQLNonNull} = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const User = require('../../../models/User');
const authMiddleware = require('../../../auth/authMiddleware');

const createPage = {
  type: PageType,
  args: {
    page_name: { type: new GraphQLNonNull(GraphQLString) },
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
  resolve: authMiddleware(async (parent, args, context , info) => {
    // Check if user is authenticated
    console.log('context user', context.user);
    if (!context.user) {
      throw new Error('User is not authenticated');
    }
      // Find the user by their email to get their _id
      const user = await User.findOne({ email: context.user.email });
      console.log('user', user);
      if (!user) {
        throw new Error('User not found');
      }

    const existingPage = await Page.findOne({ page_name: args.page_name });
    if (existingPage) {
      throw new Error('A page with this name already exists');
    }

    // Generate the page_router from page_name
    const pageRouter = args.page_name.trim().toLowerCase().replace(/\s+/g, '-');

    const newPage = new Page({
      ...args,
      page_router: pageRouter,
      author: user._id ,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Save the page
    const savedPage = await newPage.save();

    // Fetch the full user details
    const fullUserDetails = await User.findById(user._id);

    // Return the saved page with full author details
    return {
      ...savedPage._doc,
      author: fullUserDetails
    };
  })
};

module.exports = createPage;
