const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const ErrorType = new GraphQLObjectType({
  name: 'Errors',
  fields: () => ({
    path: {
      type: GraphQLString,
      resolve: (data) => data.path,
    },
    message: {
      type: GraphQLString,
      resolve: (data) => data.message,
    },
  }),
});

module.exports = { ErrorType };
