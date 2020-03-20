const { authUserQuery } = require('./AuthUserQuery');
const { getPersons, getPerson } = require('./PersonQuery');
const { getAllBrgyData, getPersonsInBrgyData } = require('./BrgyDataQuery');

module.exports = {
  authUserQuery,
  getPersons,
  getPerson,
  getAllBrgyData,
  getPersonsInBrgyData,
};
