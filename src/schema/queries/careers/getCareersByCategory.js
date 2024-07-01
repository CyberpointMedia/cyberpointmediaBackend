// src/queries/careers/getCareersByCategory.js
const { GraphQLList, GraphQLString } = require('graphql');
const CareerType = require('../../types/CareerType');
const Career = require('../../../models/Career');

const getCareersByCategory = {
  type: new GraphQLList(CareerType),
  args: {
    category: { type: GraphQLString }
  },
  resolve: async (_, { category }) => {
    const careers = await Career.find({ category });
    return careers;
  }
};

module.exports = getCareersByCategory;
