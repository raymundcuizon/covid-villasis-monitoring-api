const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');


const {
  createPerson,
  updateLocation,
  updateMonitoring,
} = require('./mutations');

const { authUserQuery, getPersons, getPerson } = require('./queries');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    authUser: authUserQuery,
    getPersons,
    getPerson,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    createPerson,
    updateLocation,
    updateMonitoring,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = { schema };
