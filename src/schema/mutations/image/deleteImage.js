const { GraphQLString, GraphQLNonNull } = require('graphql');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  region: process.env.YOUR_AWS_REGION
});

const deleteImageMutation = {
  type: GraphQLString,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, { id }) => {
    const params = {
      Bucket: process.env.YOUR_AWS_BUCKET_NAME,
      Key: `uploads/${id}`
    };

    try {
      await s3.deleteObject(params).promise();
      return `Image with id ${id} deleted successfully`;
    } catch (error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }
};

module.exports = deleteImageMutation;
