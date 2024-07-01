//src/resolvers/careers/createCareer.js
const Career = require('../../models/Career');

const createCareer = async (_, { name, skills, location, experience, description, category }) => {
  const career = new Career({ name, skills, location, experience, description, category });
  await career.save();
  return career;
};

module.exports = createCareer;
