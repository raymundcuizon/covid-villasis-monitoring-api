const { GraphQLEnumType } = require('graphql');

const UserType = new GraphQLEnumType({
  name: 'user_type',
  values: {
    system: { value: 'system' },
    rider: { value: 'rider' },
    customer: { value: 'customer' },
    merchant: { value: 'merchant' },
  },
});

module.exports = { UserType };
