const { GraphQLList } = require('graphql');
const PageType = require('../../types/PageType');
const Page = require('../../../models/Page');

const getAllPages = {
  type: new GraphQLList(PageType),
  resolve: async () => {
    return Page.find({});
  }
};

module.exports = getAllPages;
