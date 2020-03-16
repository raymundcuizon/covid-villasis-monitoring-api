const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const { ErrorType } = require('./ErrorType');
const { PersonType } = require('./index');

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
