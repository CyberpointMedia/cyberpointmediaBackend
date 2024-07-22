const { GraphQLList } = require('graphql');
const ImageType = require('../../types/ImageType');
const AWS = require('aws-sdk');
const authMiddleware = require('../../../auth/authMiddleware'); // Adjust path as needed

const s3 = new AWS.S3({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  region: process.env.YOUR_AWS_REGION
});

const getAllImagesQuery = {
  type: new GraphQLList(ImageType),
  resolve: async (parent, args, context) => {
    // Ensure user is authenticated
    authMiddleware(context);

    const params = {
      Bucket: process.env.YOUR_AWS_BUCKET_NAME,
      Prefix: 'uploads/'
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      return data.Contents.map(item => ({
        url: `https://${params.Bucket}.s3.${process.env.YOUR_AWS_REGION}.amazonaws.com/${item.Key}`,
        id: item.Key.split('/').pop()
      }));
    } catch (error) {
      throw new Error(`Failed to list files from S3: ${error.message}`);
    }
  }
};

module.exports = getAllImagesQuery;
