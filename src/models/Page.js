const { auditServer } = require('graphql-http');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const pageSchema = new Schema({
  page_name: { type: String, required: true, unique: true },
  page_router: { type: String, required: true },
  sub_description: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },  
  seoTitle: String,
  metaDescription: String,
  breadcrumbsTitle: String,
  canonicalURL: String,
  searchEngines: [String],
  hsRadioGroup: String,
  metaRobots: String,
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'draft'
  },
  current_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', pageSchema);
