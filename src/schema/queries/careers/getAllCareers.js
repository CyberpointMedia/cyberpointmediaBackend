//src/schema/queries/careers/getAllCareers.js

const { GraphQLList } = require('graphql');
const CareerType = require('../../types/CareerType');
const Career = require('../../../models/Career');

const getAllCareers = {
  type: new GraphQLList(CareerType),
  resolve: async () => {
    const careers = await Career.find();
    return careers;
  }
};

module.exports = getAllCareers;
