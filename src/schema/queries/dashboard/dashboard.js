// src/schema/query/dashboard.js
const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');
const DashboardType = require('../../types/DashboardType');
const Dashboard = require('../../../models/Dashboard');

const getUserLogs = {
    type: new GraphQLList(DashboardType),
    args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { userId }) => {
        return await Dashboard.find({ user: userId }).sort({ createdAt: -1 });
    },
};

module.exports = {
    getUserLogs,
};
