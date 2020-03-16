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
/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const { schema } = require('./graphql');
const { models } = require('./models');

// environment: development, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const DB = dbService(environment, config.migrate).start();

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

const graphQLServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user,
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
