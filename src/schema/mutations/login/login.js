// src/schema/mutations/login.js
const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthPayloadType = require('../../types/AuthPayloadType');
const User = require('../../../models/User'); // Import the User model

const login = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, { email, password }) => {
    // Check for superadmin credentials
    if (email === 'admin@gmail.com' && password === 'adminpassword') {
      const token = jwt.sign({ email, role: 'superadmin' }, 'your_secret_key');
      return { message: 'Logged in successfully as superadmin', token };
    }

    // Search in the database for the user
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ email: user.email, role: user.role }, 'your_secret_key');
    return { message: 'Logged in successfully', token };
  }
};
module.exports = login;
