const { GraphQLString, GraphQLList } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const authMiddleware = require('../../../auth/authMiddleware');

const createPage = {
  type: PageType,
  args: {
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
    const existingPage = await Page.findOne({ page_name: args.page_name });
    if (existingPage) {
      throw new Error('A page with this name already exists');
    }
    // Generate the page_router from page_name
    const pageRouter = args.page_name.trim().toLowerCase().replace(/\s+/g, '-');

    const newPage = new Page({
      ...args,
      page_router: pageRouter,
      created_at: new Date(),
      updated_at: new Date()
    });

    return newPage.save();
  })
};

module.exports = createPage;
