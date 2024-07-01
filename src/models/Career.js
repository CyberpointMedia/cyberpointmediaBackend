//src/models/Career.js
const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const Career = mongoose.model('Career', CareerSchema);

module.exports = Career;
