const { GraphQLNonNull, GraphQLString } = require('graphql');
const ImageType = require('../../types/ImageType');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  region: process.env.YOUR_AWS_REGION
});

const getImageById = {
  type: ImageType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, { id }) => {
    const params = {
      Bucket: process.env.YOUR_AWS_BUCKET_NAME,
      Key: `uploads/${id}`
    };

    try {
      const headData = await s3.headObject(params).promise();
      return {
        url: `https://${params.Bucket}.s3.${process.env.YOUR_AWS_REGION}.amazonaws.com/${params.Key}`,
        id: params.Key.split('/').pop()
      };
    } catch (error) {
      throw new Error(`Failed to get image: ${error.message}`);
    }
  }
};

module.exports = getImageById;
