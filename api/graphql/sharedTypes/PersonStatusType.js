const { GraphQLEnumType } = require('graphql');

const personStatusType = new GraphQLEnumType({
  name: 'personStatusType',
  values: {
    CONFIRMED_CASE: { value: 'CONFIRMED_CASE' },
    PUI_ADMITTED: { value: 'PUI_ADMITTED' },
    PUI_DIED: { value: 'PUI_DIED' },
    PUI_DISCHARGED: { value: 'PUI_DISCHARGED' },
    PUM_UNDER_QUARANTINE: { value: 'PUM_UNDER_QUARANTINE' },
    PUM_COMPLETED_QUARANTINE: { value: 'PUM_COMPLETED_QUARANTINE' },
    PUM_DIED: { value: 'PUM_DIED' },
    PUM_ADMITTED: { value: 'PUM_ADMITTED' },
  },
});

module.exports = { personStatusType };
