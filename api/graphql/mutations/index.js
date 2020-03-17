const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const { createPerson, updateLocation, updateMonitoring } = require('./Person');

const { AuthTokenType } = require('../types/MutationResponseType');
const { tryLogin } = require('../../services/auth.service');

const userLogin = {
  type: AuthTokenType,
  description: 'The mutation that allows you to create token',
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, { email, password }, { models, SECRET, SECRET2 }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    tryLogin(email, password, models, SECRET, SECRET2),
};


module.exports = {
  createPerson,
  updateLocation,
  updateMonitoring,
  userLogin,
};
