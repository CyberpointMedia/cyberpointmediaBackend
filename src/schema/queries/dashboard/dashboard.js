// src/schema/query/dashboard.js
const { GraphQLList, GraphQLString, GraphQLNonNull ,GraphQLInt} = require('graphql');
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

// New query to get the total number of unique users who have logged in
const getTotalLoggedInUsers = {
    type: GraphQLInt, // This will return an integer representing the count
    resolve: async () => {
        const distinctUsers = await Dashboard.distinct('user');
        return distinctUsers.length; // Count the number of distinct users
    },
};

// Query to get the total number of active users (users who haven't logged out)
const getTotalActiveUsers = {
    type: GraphQLInt,
    resolve: async () => {
        const activeUsers = await Dashboard.find({ logoutTime: null }).distinct('user');
        return activeUsers.length; // Return count of users with no logoutTime
    },
};

module.exports = {
    getUserLogs,
    getTotalLoggedInUsers,
    getTotalActiveUsers,
};
