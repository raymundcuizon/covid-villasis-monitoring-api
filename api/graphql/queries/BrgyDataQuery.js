/* eslint-disable prefer-const */

const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const { OverallDataType } = require('../types');
const { brgy } = require('../../../config/brgy');
const { PersonQueryResponseType } = require('../types/QueryResponseType');

const getAllBrgyData = {
  type: OverallDataType,
  args: {},
  resolve: async (_, args, { models }) => {
    const brgyData = await models.sequelize.query('SELECT barangay, status FROM persons', { type: models.sequelize.QueryTypes.SELECT });

    let template = [];
    let overall = {
      TOTAL: 0,
      CONFIRMED_CASE: 0,
      PUI_ADMITTED: 0,
      PUI_DIED: 0,
      PUI_DISCHARGED: 0,
      PUM_UNDER_QUARANTINE: 0,
      PUM_COMPLETED_QUARANTINE: 0,
      PUM_DIED: 0,
      PUM_ADMITTED: 0,
    };
    brgy.forEach((value) => {
      let tempBryName = {
        name: value.name,
        report: {
          TOTAL: 0,
          CONFIRMED_CASE: 0,
          PUI_ADMITTED: 0,
          PUI_DIED: 0,
          PUI_DISCHARGED: 0,
          PUM_UNDER_QUARANTINE: 0,
          PUM_COMPLETED_QUARANTINE: 0,
          PUM_DIED: 0,
          PUM_ADMITTED: 0,
        },
      };
      brgyData.forEach((val) => {
        if (value.name === val.barangay) {
          tempBryName.report.TOTAL += 1;
          overall.TOTAL += 1;
          if (val.status === 'CONFIRMED_CASE') {
            tempBryName.report.CONFIRMED_CASE += 1;
            overall.CONFIRMED_CASE += 1;
          } else if (val.status === 'PUI_ADMITTED') {
            tempBryName.report.PUI_ADMITTED += 1;
            overall.PUI_ADMITTED += 1;
          } else if (val.status === 'PUI_DIED') {
            tempBryName.report.PUI_DIED += 1;
            overall.PUI_DIED += 1;
          } else if (val.status === 'PUI_DISCHARGED') {
            tempBryName.report.PUI_DISCHARGED += 1;
            overall.PUI_DISCHARGED += 1;
          } else if (val.status === 'PUM_UNDER_QUARANTINE') {
            tempBryName.report.PUM_UNDER_QUARANTINE += 1;
            overall.PUM_UNDER_QUARANTINE += 1;
          } else if (val.status === 'PUM_COMPLETED_QUARANTINE') {
            tempBryName.report.PUM_COMPLETED_QUARANTINE += 1;
            overall.PUM_COMPLETED_QUARANTINE += 1;
          } else if (val.status === 'PUM_DIED') {
            tempBryName.report.PUM_DIED += 1;
            overall.PUM_DIED += 1;
          } else if (val.status === 'PUM_ADMITTED') {
            tempBryName.report.PUM_ADMITTED += 1;
            overall.PUM_ADMITTED += 1;
          }
        }
      });
      template.push(tempBryName);
    });

    const response = { overall, perBarangay: template };
    return response;
  },
};

const getPersonsInBrgyData = {
  type: PersonQueryResponseType,
  args: {
    barangay: {
      name: 'barangay',
      type: new GraphQLNonNull(GraphQLString),
    },
    page: {
      name: 'page',
      type: new GraphQLNonNull(GraphQLInt),
    },
    limit: {
      name: 'limit',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (_, { barangay, page, limit }, { models }) => {
    const data = await models.Person.pagination({ page, limit }, { barangay });
    return {
      ok: true,
      persons: data.data_list,
      pagination: data.pagination,
    };
  },
};

module.exports = { getAllBrgyData, getPersonsInBrgyData };
