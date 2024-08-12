// src/models/Dashboard.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date },
  location: { type: String }
}, { timestamps: true });

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
