//src/resolvers/careers/getCareersByCategory.js
const Career = require('../../models/Career');

const getCareersByCategory = async (_, { category }) => {
  const careers = await Career.find({ category });
  return careers;
};

module.exports = getCareersByCategory;
