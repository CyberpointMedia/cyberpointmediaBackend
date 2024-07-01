// src/resolvers/index.js
const allUsers = require('../resolvers/users/allUsers');
const getUserById = require('../resolvers/users/getUserById');
const createUser = require('../resolvers/users/createUser');
const updateUser = require('../resolvers/users/updateUser');
const deleteUser = require('../resolvers/users/deleteUser');

const login = require('./auth/login');
const logout = require('./auth/logout');

const createCareer = require('./careers/createCareer');
const hello = require('../schema/queries/hello/hello');

const resolvers = {
    hello: () => {
        return 'Hello, world!';
      },
  Query: {
    hello: hello,
    allUsers: allUsers,
    getUserById: getUserById,
    // Add other queries here
  },
  Mutation: {
    login: login,
    logout: logout,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    createCareer: createCareer,
    // Add other mutations here
  }
};

module.exports = resolvers;
