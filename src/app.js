// src/server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { login, logout } = require('./auth/authController');
const PORT = process.env.PORT || 4000;
require('./auth/passportConfig');

const app = express();

app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', login);
app.post('/logout', logout);

app.use('/graphql', graphqlHTTP((req) => ({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    context: { headers: req.headers }
  })));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cyberpointmedia', {
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
