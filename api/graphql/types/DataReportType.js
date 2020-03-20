const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

const dataReport = new GraphQLObjectType({
  name: 'dataReport',
  fields: () => ({
    TOTAL: {
      type: GraphQLInt,
      resolve: (data) => data.TOTAL,
    },
    CONFIRMED_CASE: {
      type: GraphQLInt,
      resolve: (data) => data.CONFIRMED_CASE,
    },
    PUI_ADMITTED: {
      type: GraphQLInt,
      resolve: (data) => data.PUI_ADMITTED,
    },
    PUI_DIED: {
      type: GraphQLInt,
      resolve: (data) => data.PUI_DIED,
    },
    PUI_DISCHARGED: {
      type: GraphQLInt,
      resolve: (data) => data.PUI_DISCHARGED,
    },
    PUM_UNDER_QUARANTINE: {
      type: GraphQLInt,
      resolve: (data) => data.PUM_UNDER_QUARANTINE,
    },
    PUM_COMPLETED_QUARANTINE: {
      type: GraphQLInt,
      resolve: (data) => data.PUM_COMPLETED_QUARANTINE,
    },
    PUM_DIED: {
      type: GraphQLInt,
      resolve: (data) => data.PUM_DIED,
    },
    PUM_ADMITTED: {
      type: GraphQLInt,
      resolve: (data) => data.PUM_ADMITTED,
    },
  }),
});

const PerBrgyDataType = new GraphQLObjectType({
  name: 'PerBrgyDataType',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (data) => data.name,
    },
    report: {
      type: dataReport,
      resolve: (data) => data.report,
    },
  }),
});

const OverallDataType = new GraphQLObjectType({
  name: 'OverallDataType',
  fields: () => ({
    overall: {
      type: dataReport,
      resolve: (data) => data.overall,
    },
    perBarangay: {
      type: new GraphQLList(PerBrgyDataType),
      resolve: (data) => data.perBarangay,
    },
  }),
});


module.exports = { OverallDataType };
