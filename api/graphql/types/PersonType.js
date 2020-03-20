const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { MonitoringType } = require('./MonitoringType');
const { LocationType } = require('./LocationType');
const { personStatusType } = require('../sharedTypes/PersonStatusType');

const PersonStatusHistoryType = new GraphQLObjectType({
  name: 'PersonStatusHistoryType',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (data) => data.id,
    },
    status: {
      type: personStatusType,
      resolve: (data) => data.status,
    },
  }),
});

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
    status: {
      type: personStatusType,
      resolve: (data) => data.status,
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
    statusHistory: {
      type: new GraphQLList(PersonStatusHistoryType),
      resolve: (data) => data.getStatusHistory({
        order: [
          ['createdAt', 'DESC'],
        ],
      }),
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
