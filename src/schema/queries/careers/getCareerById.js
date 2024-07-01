// src/queries/careers/getCareerById.js
const { GraphQLNonNull, GraphQLID } = require('graphql');
const CareerType = require('../../types/CareerType');
const Career = require('../../../models/Career');

const getCareerById = {
  type: CareerType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }) => {
    const career = await Career.findById(id);
    if (!career) {
      throw new Error('Career not found');
    }
    return career;
  }
};

module.exports = getCareerById;
