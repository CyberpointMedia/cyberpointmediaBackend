// src/schema/mutations/applyJob/applyJob.js
const JobApplication = require('../../../models/JobApplication');
const { GraphQLUpload } = require('graphql-upload');
const { GraphQLString } = require('graphql');
const MessageType = require('../../types/MessageType'); // Ensure correct import
const { createWriteStream } = require('fs');
const path = require('path');

const storeUpload = async ({ stream, filename }) => {
  const uploadPath = path.join(__dirname, '../../../uploads', filename);
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(uploadPath))
      .on('finish', () => resolve(uploadPath))
      .on('error', reject)
  );
};

module.exports = {
  applyJob: {
    type: MessageType, // Use the imported MessageType
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      cv: { type: GraphQLUpload },
      linkedin: { type: GraphQLString },
      github: { type: GraphQLString },
      others: { type: GraphQLString },
      phone: { type: GraphQLString },
      description: { type: GraphQLString }
    },
    async resolve(_, { name, email, cv, linkedin, github, others, phone, description }) {
      const { createReadStream, filename } = await cv;
      const stream = createReadStream();
      const path = await storeUpload({ stream, filename });

      const jobApplication = new JobApplication({
        name,
        email,
        cv: path,
        linkedin,
        github,
        others,
        phone,
        description
      });

      await jobApplication.save();
      return { message: 'Job application submitted successfully!' };
    }
  }
};


