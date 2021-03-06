const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const {
  createPerson, updateLocation, updateMonitoring, updateStatus,
} = require('./Person');

const { AuthTokenType } = require('../types/MutationResponseType');
const { tryLogin } = require('../../services/auth.service');

const userLogin = {
  type: AuthTokenType,
  description: 'The mutation that allows you to create token',
  args: {
    username: {
      name: 'username',
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_, { username, password }, { SECRET, SECRET2, models }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    tryLogin(username, password, models, SECRET, SECRET2),
};


module.exports = {
  createPerson,
  updateLocation,
  updateMonitoring,
  userLogin,
  updateStatus,
};
