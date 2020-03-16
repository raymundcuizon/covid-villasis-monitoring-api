const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');


const MonitoringType = new GraphQLObjectType({
  name: 'MonitoringType',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (data) => data.id,
    },
    body_temp: {
      type: GraphQLString,
      resolve: (data) => data.body_temp,
    },
    symptoms: {
      type: GraphQLString,
      resolve: (data) => data.symptoms,
    },
    others: {
      type: GraphQLString,
      resolve: (data) => data.others,
    },
  }),
});

module.exports = { MonitoringType };
