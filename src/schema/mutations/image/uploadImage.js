const { GraphQLUpload } = require('graphql-upload');
const { storeUpload } = require('../../../auth/uploadMiddleware'); // Ensure this path is correct
const ImageType = require('../../types/ImageType');

const uploadImageMutation = {
  type: ImageType,
  args: {
    file: { type: GraphQLUpload }
  },
  resolve: async (_, { file }) => {
    const { createReadStream, filename } = await file;

    try {
      // Use storeUpload to handle the image upload
      const url = await storeUpload({ stream: createReadStream(), filename });

      // Return an object containing the URL and ID
      return { url, id: filename.split('/').pop() };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
};

module.exports = uploadImageMutation;
