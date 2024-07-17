// src/models/Post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post_name: {
    type: String,
    required: true,
    unique: true
  },
  post_router: {
    type: String,
    required: true,
    unique: true
  },
  sub_description: {
    type: String
  },
  description: {
    type: String
  },
  feature_img: {
    type: String
  },
  picture_img: {
    type: String
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'draft'
  },
  author: {
    type: String,
    required: true
  },
  seotitle: {
    type: String
  },
  seometadescription: {
    type: String
  },
  breadcrumbsTitle: {
    type: String
  },
  canonicalURL: {
    type: String
  },
  searchEngines: {
    type: [String]
  },
  hsRadioGroup: {
    type: String
  },
  metaRobots: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

postSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
  });
  
module.exports = mongoose.model('Post', postSchema);