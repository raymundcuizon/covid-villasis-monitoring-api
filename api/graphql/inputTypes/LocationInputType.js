const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const LocationInputType = new GraphQLInputObjectType({
  name: 'LocationInputType',
  fields: {
    address: { type: new GraphQLNonNull(GraphQLString) },
    barangay: { type: new GraphQLNonNull(GraphQLString) },
    city_town: { type: new GraphQLNonNull(GraphQLString) },
    province: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = { LocationInputType };
