const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
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
    chairman: {
      type: GraphQLString,
      resolve: (data) => data.chairman,
    },
    contact_number: {
      type: GraphQLString,
      resolve: (data) => data.contact_number,
    },
    contact_person: {
      type: GraphQLString,
      resolve: (data) => data.contact_person,
    },
    is_superuser: {
      type: GraphQLBoolean,
      resolve: (data) => data.is_superuser,
    },
    is_activated: {
      type: GraphQLBoolean,
      resolve: (data) => data.is_activated,
    },
    barangay: {
      type: GraphQLString,
      resolve: (data) => data.barangay,
    },


  }),
});

module.exports = { AuthUserType };
