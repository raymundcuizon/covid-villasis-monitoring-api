const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (data) => data.id,
    },
    address: {
      type: GraphQLString,
      resolve: (data) => data.address,
    },
    barangay: {
      type: GraphQLString,
      resolve: (data) => data.barangay,
    },
    city_town: {
      type: GraphQLString,
      resolve: (data) => data.city_town,
    },
    province: {
      type: GraphQLString,
      resolve: (data) => data.province,
    },
  }),
});


module.exports = { LocationType };
