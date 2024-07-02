// src/schema/queries/jobApplications/getAllJobApplications.js
const { GraphQLList } = require('graphql');
const JobApplicationType = require('../../types/JobApplicationType'); // Create this type
const JobApplication = require('../../../models/JobApplication');

module.exports = {
  type: new GraphQLList(JobApplicationType),
  resolve: async () => {
    try {
      const jobApplications = await JobApplication.find();
      return jobApplications;
    } catch (err) {
      throw new Error('Error fetching job applications: ' + err.message);
    }
  }
};
