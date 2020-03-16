/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { models } = require('../../api/models');
const { singleFileUpload } = require('../../api/services/fileUpload.service');
const database = require('../../config/database');
// const auth = require('../../api/policies/auth.policy');
const { schema } = require('../../api/graphql');

process.env.NODE_ENV = 'testing';

const beforeAction = async () => {
  const testapp = express();

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  const graphQLServer = new ApolloServer({
    uploads: {
      // Limits here should be stricter than config for surrounding
      // infrastructure such as Nginx so errors can be handled elegantly by
      // graphql-upload:
      // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
      maxFileSize: 10000000, // 10 MB
      maxFiles: 20,
    },
    schema,
    context: ({ req }) => ({
      user: req.user,
      models,
      singleFileUpload,
    }),
  });

  graphQLServer.applyMiddleware({
    app: testapp,
  });

  await database.authenticate();
  await database.drop();
  await database.sync();

  console.log('Connection to the database has been established successfully');

  return testapp;
};

const afterAction = async () => {
  await database.close();
};


module.exports = {
  beforeAction,
  afterAction,
};
