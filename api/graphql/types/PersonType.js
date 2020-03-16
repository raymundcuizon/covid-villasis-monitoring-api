const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { MonitoringType } = require('./MonitoringType');
const { LocationType } = require('./LocationType');

const PersonType = new GraphQLObjectType({
  name: 'PersonType',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (data) => data.id,
    },
    pid: {
      type: GraphQLString,
      resolve: (data) => data.pid,
    },
    firstname: {
      type: GraphQLString,
      resolve: (data) => data.firstname,
    },
    middlename: {
      type: GraphQLString,
      resolve: (data) => data.middlename,
    },
    lastname: {
      type: GraphQLString,
      resolve: (data) => data.lastname,
    },
    origin: {
      type: GraphQLString,
      resolve: (data) => data.origin,
    },
    age: {
      type: GraphQLString,
      resolve: (data) => data.age,
    },
    gender: {
      type: GraphQLString,
      resolve: (data) => data.gender,
    },
    monitorings: {
      type: new GraphQLList(MonitoringType),
      resolve: (data) => data.getMonitorings({
        order: [
          ['createdAt', 'DESC'],
        ],
      }),
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve: (data) => data.getLocations({
        order: [
          ['createdAt', 'DESC'],
        ],
      }),
    },
  }),
});

module.exports = { PersonType };
