//src/schema/mutations/careers/updateCareer.js
const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } = require('graphql');
const CareerType = require('../../types/CareerType');
const Career = require('../../../models/Career');

const updateCareer = {
  type: CareerType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    skills: { type: GraphQLString },
    location: { type: GraphQLString },
    experience: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString }
  },
  resolve: async (_, { id, name, skills, location, experience, description, category }) => {
    try {
    const updatedCareer = await Career.findByIdAndUpdate(
      id,
      { name, skills, location, experience, description, category },
      { new: true }
    );
    if (!updatedCareer) {
        throw new Error('Career not found');
      }
    return updatedCareer;
} catch (error) {
    throw new Error(`Failed to update career: ${error.message}`);
  }
}
};

module.exports = updateCareer;
