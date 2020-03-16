const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const AuthUserType = new GraphQLObjectType({
  name: 'AuthUser',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (data) => data.id,
    },
    username: {
      type: GraphQLString,
      resolve: (data) => data.username,
    },
    email: {
      type: GraphQLString,
      resolve: (data) => data.email,
    },
  }),
});

module.exports = { AuthUserType };
