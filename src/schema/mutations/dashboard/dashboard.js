// src/schema/mutation/dashboard.js
const { GraphQLString, GraphQLNonNull } = require('graphql');
const axios = require('axios');
const DashboardType = require('../../types/DashboardType');
const Dashboard = require('../../../models/Dashboard');

// Function to get geolocation from IP using axios
async function getGeoLocation(ip) {
    try {
        // If IP is localhost, get external IP from an external service
        if (ip === '::1' || ip === '127.0.0.1') {
            // const externalIpResponse = await axios.get('https://api64.ipify.org?format=json');
            // ip = externalIpResponse.data.ip;
            ip = '103.251.142.10'; // Google's public DNS IP address
        }

        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        const data = response.data;

        if (data.status === 'fail'){
            throw new Error('Failed to get geolocation from IP address');
        }
        return {
            lat: data.lat,
            lon: data.lon,
            city: data.city,
            country: data.country
        };
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        throw new Error('Failed to get geolocation from IP address');
    }
}
// Function to get address from lat/lon using Nominatim and axios
async function getAddressFromCoordinates(lat, lon) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                format: 'json',
                lat: lat,
                lon: lon
            }
        });
        const data = response.data;
        console.log('Address data:', data);
        return data.display_name;
    } catch (error) {
        console.error('Error fetching address from coordinates:', error);
        throw new Error('Failed to get address from coordinates');
    }
}

const logLogin = {
    type: DashboardType,
    args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, { userId }, context) => {
        // Get the user's IP address
        const ip = context.req.ip;

        // Get the geolocation (latitude and longitude) from the IP address
        const { lat, lon, city, country } = await getGeoLocation(ip);
        console.log('Geolocation:', lat, lon, city, country);
        // Get the address using Nominatim
        const location = await getAddressFromCoordinates(lat, lon);
        // Save the location and login time to the database
        const dashboard = new Dashboard({
            user: userId,
            loginTime: new Date(),
            location: `${city}, ${country} - ${location}`, // Include city and country in the location
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
    getGeoLocation,
    getAddressFromCoordinates,
    logLogin,
    logLogout
};
