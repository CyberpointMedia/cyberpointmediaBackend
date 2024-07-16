const mongoose = require('mongoose');
const { Schema } = mongoose;

const pageSchema = new Schema({
  page_name: { type: String, required: true, unique: true },
  page_router: { type: String, required: true },
  sub_description: String,
  description: String,
  seoTitle: String,
  metaDescription: String,
  breadcrumbsTitle: String,
  canonicalURL: String,
  searchEngines: [String],
  hsRadioGroup: String,
  metaRobots: String,
  status: String,
  current_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', pageSchema);