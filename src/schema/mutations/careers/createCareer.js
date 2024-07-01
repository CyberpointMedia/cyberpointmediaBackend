//src/schema/mutations/careers/createCareer.js
const { GraphQLNonNull, GraphQLString } = require('graphql');
const CareerType = require('../../types/CareerType');
const Career = require('../../../models/Career');
const authMiddleware = require('../../../auth/authMiddleware');

const createCareer = {
    type: CareerType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        skills: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        experience: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: authMiddleware(async (_, { name, skills, location, experience, description, category }) => {
        try {
            const career = new Career({ name, skills, location, experience, description, category });
            await career.save();
            return career;
        } catch (error) {
            // Handle the error here
            console.error('Error creating career:', error);
            throw new Error('Failed to create career');
        }
    })
};

module.exports = createCareer;
