//src/schema/queries/page/getAllPages.js
const { GraphQLList } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');
const User = require('../../../models/User'); // Import User model

const getAllPages = {
  type: new GraphQLList(PageType),
  resolve: async () => {
    try {
      // Find all pages
      const pages = await Page.find({});

      // Fetch detailed author information for each page
      const pagesWithAuthors = await Promise.all(pages.map(async (page) => {
        let authorDetails = null;
        if (page.author) { // Ensure author exists
          try {
            authorDetails = await User.findById(page.author); // Fetch author details
            console.log('authorDetails', authorDetails);
            if (!authorDetails) {
              console.warn(`Author not found for page: ${page._id}`);
            }
          } catch (err) {
            console.error(`Error fetching author details: ${err.message}`);
          }
        }

        return {
          ...page._doc,
          author: authorDetails ? {
            _id: authorDetails._id ? authorDetails._id.toString() : null,
            username: authorDetails.username,
            email: authorDetails.email,
            website: authorDetails.website,
            role: authorDetails.role
          } : null
        };
      }));

      return pagesWithAuthors;
    } catch (error) {
      throw new Error(`Failed to fetch pages: ${error.message}`);
    }
  }
};

module.exports = getAllPages;
