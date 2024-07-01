//src/schema/mutations/careers/deleteCareer.js
const { GraphQLNonNull, GraphQLID } = require('graphql');
const CareerType = require('../../types/CareerType');
const Career = require('../../../models/Career');

const deleteCareer = {
    type: CareerType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { id }) => {
        try {
            const career = await Career.findByIdAndDelete(id);
            if (!career) {
                throw new Error('Career not found');
            }
            return career;
        } catch (error) {
            // Handle the error here
            console.error(error);
            throw new Error('Failed to delete career');
        }
    }
};

module.exports = deleteCareer;
