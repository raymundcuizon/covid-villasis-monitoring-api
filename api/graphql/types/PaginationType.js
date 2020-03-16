const {
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');

const PaginationType = new GraphQLObjectType({
  name: 'PaginationType',
  fields: () => ({
    pages: {
      type: GraphQLInt,
      resolve: (data) => data.pages,
    },
    total: {
      type: GraphQLInt,
      resolve: (data) => data.total,
    },
    before: {
      type: GraphQLInt,
      resolve: (data) => data.before,
    },
    next: {
      type: GraphQLInt,
      resolve: (data) => data.next,
    },
  }),
});

module.exports = { PaginationType };
