// src/schema/mutations/login.js
const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthPayloadType = require('../../types/AuthPayloadType');
const User = require('../../../models/User'); // Import the User model
require('dotenv').config();

const login = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, { email, password }) => {
    // Check for superadmin credentials
    if (email === process.env.USER_EMAIL && password === process.env.password) {
      const token = jwt.sign({ email, role: 'superadmin' }, process.env.JWT_SECRET_KEY);
      return { message: 'Logged in successfully as superadmin', token };
    }

    // Search in the database for the user
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET_KEY);
    return { message: 'Logged in successfully', token };
  }
};
module.exports = login;
