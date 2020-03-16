const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const {
  PersonType,
} = require('./index');


const {
  PaginationType,
} = require('./PaginationType');

const PersonQueryResponseType = new GraphQLObjectType({
  name: 'PersonQueryResponseType',
  fields: () => ({
    ok: {
      type: GraphQLBoolean,
      resolve: (data) => data.ok,
    },
    persons: {
      type: new GraphQLList(PersonType),
    },
    pagination: {
      type: PaginationType,
    },
  }),
});

module.exports = {
  PersonQueryResponseType,
};
