// src/schema/mutations/login.js
const { GraphQLNonNull, GraphQLString } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthPayloadType = require('../../types/AuthPayloadType');
const User = require('../../../models/User'); // Import the User model
const Dashboard = require('../../../models/Dashboard'); 
const { getGeoLocation, getAddressFromCoordinates } = require('../dashboard/dashboard'); 
require('dotenv').config();

const login = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, { email, password }, context) => {
    const { req } = context;
    console.log('Request:', req);
    // Check for superadmin credentials
    if (email === process.env.USER_EMAIL && password === process.env.password) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET_KEY);
      return { message: 'Logged in successfully as superadmin ', token , role: 'admin'};
    }

    // Search in the database for the user
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET_KEY);
    
    // Initialize default location information in case geolocation fails
     let location = 'Location unknown';
     let city = 'N/A';
     let country = 'N/A';
 

     // Try to get the geolocation from the IP address
     try {
      const ip = req.ip;
      const geoData = await getGeoLocation(ip);
      if (geoData) {
        const { lat, lon, city: geoCity, country: geoCountry } = geoData;
        city = geoCity || 'Unknown City';
        country = geoCountry || 'Unknown Country';
        location = await getAddressFromCoordinates(lat, lon);
      }
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      // Geolocation failed, continue with default location information
    }
    // Log the login time and location to the Dashboard
    const dashboardEntry = new Dashboard({
      user: user.id,
      loginTime: new Date(),
      location:  `${city}, ${country} - ${location}`, // or another way to get the user's location
    });
    await dashboardEntry.save();

    return { message: 'Logged in successfully', token , role: user.role, dashboardEntry};
  }
};
module.exports = login;
