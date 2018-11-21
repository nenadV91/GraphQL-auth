const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const expressGraphQL = require('express-graphql');
const MongoStore = require('connect-mongo')(session);
const schema = require('./graphql');

const app = express();
dotenv.config();

// Passport
require('./services/passport')

// Mongodb
require('./services/db');

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection 
  })
}));

// Middleware
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// GraphQL
app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}))

// Static and react files
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port: ${port}`));