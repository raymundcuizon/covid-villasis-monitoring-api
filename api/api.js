/* eslint-disable no-console */
/**
 * third party libraries
 */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const { refreshTokens } = require('./services/auth.service');
const { schema } = require('./graphql');
const { models } = require('./models');

// environment: development, testing, production
const environment = process.env.NODE_ENV;
const SECRET = process.env.JWT_SECRET;
const SECRET2 = process.env.JWT_SECRET2;

/**
 * express application
 */
const app = express();
const DB = dbService(environment, config.migrate).start();

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

// allow cross origin requests
// configure to allow only requests from certain origins
app.use(cors('*'));

// secure express app
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  }),
);

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(addUser);

const graphQLServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user,
    SECRET,
    SECRET2,
    models,
  }),
});

graphQLServer.applyMiddleware({
  app,
});

app.listen(config.port, () => {
  if (
    environment !== 'production'
    && environment !== 'development'
    && environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  console.log(`Server ready at http://localhost:${config.port}/graphql`);

  return DB;
});
