// src/server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { graphqlHTTP } = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { login, logout } = require('./auth/authController');
const PORT = process.env.PORT || 4000;
require('dotenv').config();
require('./auth/passportConfig');

const app = express();
app.use(cors());

app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', login);
app.post('/logout', logout);

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  customFormatErrorFn: (error) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  }),
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
