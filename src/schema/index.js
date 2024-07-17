// src/schema/index.js
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const login = require('./mutations/login/login');
const logout = require('./mutations/logout/logout');
const createUser = require('./mutations/users/createUser');
const hello = require('./queries/hello/hello');
const allUsers = require('./queries/users/allUsers');
const updateUser = require('./mutations/users/updateUser');
const getUserById = require('./queries/users/getUserById');
const deleteUser = require('./mutations/users/deleteUser');
const createCareer = require('./mutations/careers/createCareer');
const updateCareer = require('./mutations/careers/updateCareer'); 
const deleteCareer = require('./mutations/careers/deleteCareer');
const getCareersByCategory = require('./queries/careers/getCareersByCategory');
const getCareerById = require('./queries/careers/getCareerById'); 
const getAllCareers = require('./queries/careers/getAllCareers'); 
const {applyJob}= require('./mutations/JobApplications/JobApplications');
const getAllJobApplications = require('./queries/jobApplications/getAllJobApplications');
const { get } = require('mongoose');
const createPage = require('./mutations/page/CreatePage');
const getAllPages = require('./queries/page/getAllPages');
const getPageById = require('./queries/page/getPageById');
const getPageByRouter = require('./queries/page/getPageByRouter');
const deletePage = require('./mutations/page/deletePage');
const updatePage = require('./mutations/page/updatePage');
const createPost = require('./mutations/post/createPost');
const updatePost = require('./mutations/post/updatePost');
const deletePost = require('./mutations/post/deletePost');

// Root query type show all users
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello,
        allUsers,
        getUserById,
        getCareersByCategory,
        getCareerById,
        getAllCareers,
        getAllJobApplications,
        getAllPages,
        getPageById,
        getPageByRouter,
        // Add other queries here
    }
});
// Root mutation type
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login,
        logout,
        createUser,
        updateUser,
        deleteUser,
        createCareer,
        updateCareer,
        deleteCareer,
        applyJob,
        createPage,
        deletePage,
        updatePage,
        createPost,
        deletePost,
        updatePost,
    }
});

// Schema
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = schema;
