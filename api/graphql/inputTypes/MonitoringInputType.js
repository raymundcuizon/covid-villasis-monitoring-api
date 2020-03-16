const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const MonitoringInputType = new GraphQLInputObjectType({
  name: 'MonitoringInputType',
  fields: {
    body_temp: { type: new GraphQLNonNull(GraphQLString) },
    symptoms: { type: GraphQLString },
    others: { type: GraphQLString },
  },
});

module.exports = { MonitoringInputType };
