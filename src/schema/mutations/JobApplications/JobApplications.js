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
      try {
        if (!cv && !cv.filename) {
          throw new Error('CV file is required.');
        }

        const { createReadStream, filename, mimetype } = await cv;
        const validExtensions = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (!validExtensions.includes(mimetype)) {
          throw new Error('Invalid file type. Only PDF and DOC/DOCX files are allowed.');
        }

        const stream = createReadStream();
        const filePath = await storeUpload({ stream, filename });

        const jobApplication = new JobApplication({
          name,
          email,
          cv: filePath,
          linkedin,
          github,
          others,
          phone,
          description
        });

        await jobApplication.save();
        return { message: 'Job application submitted successfully!' };
      } catch (error) {
        console.error('Error submitting job application:', error);
        return { message: `Failed to submit job application. ${error.message}` };
      }
    }
  }
};
