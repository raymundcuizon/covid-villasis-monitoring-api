const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const { ErrorType } = require('./ErrorType');
const { PersonType } = require('./index');

const navType = new GraphQLObjectType({
  name: 'navType',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (data) => data.name,
    },
    url: {
      type: GraphQLString,
      resolve: (data) => data.url,
    },
    icon: {
      type: GraphQLString,
      resolve: (data) => data.icon,
    },
  }),
});

const AuthTokenType = new GraphQLObjectType({
  name: 'AuthToken',
  fields: () => ({
    ok: {
      type: GraphQLBoolean,
      resolve: (data) => data.ok,
    },
    token: {
      type: GraphQLString,
      resolve: (data) => data.token,
    },
    refreshToken: {
      type: GraphQLString,
      resolve: (data) => data.refreshToken,
    },
    nav: {
      type: new GraphQLList(navType),
      resolve: (data) => data.nav,
    },
    errors: {
      type: new GraphQLList(ErrorType),
    },
  }),
});

const personMutationResponse = new GraphQLObjectType({
  name: 'personMutationResponse',
  fields: () => ({
    ok: {
      type: GraphQLBoolean,
      resolve: (data) => data.ok,
    },
    person: {
      type: PersonType,
    },
    errors: {
      type: new GraphQLList(ErrorType),
    },
  }),
});

module.exports = {
  AuthTokenType,
  personMutationResponse,
};
