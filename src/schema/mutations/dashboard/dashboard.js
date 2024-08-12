// src/schema/mutation/dashboard.js
const { GraphQLString, GraphQLNonNull } = require('graphql');
const DashboardType = require('../../types/DashboardType');
const Dashboard = require('../../../models/Dashboard');

const logLogin = {
    type: DashboardType,
    args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { userId, location }) => {
        const dashboard = new Dashboard({
            user: userId,
            loginTime: new Date(),
            location: location,
        });
        return await dashboard.save();
    },
};

const logLogout = {
    type: DashboardType,
    args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { userId }) => {
        const dashboard = await Dashboard.findOne({ user: userId }).sort({ createdAt: -1 });
        if (dashboard) {
            dashboard.logoutTime = new Date();
            return await dashboard.save();
        }
        throw new Error('No active session found for this user.');
    },
};

module.exports = {
    logLogin,
    logLogout,
};
