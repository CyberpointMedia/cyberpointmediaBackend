// src/models/JobApplication.js
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cv: {
    type: String, 
    required: true
  },
  linkedin: {
    type: String, 
    required: true
  },
  github: String,
  others: String,
  phone: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
