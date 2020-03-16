const {
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { AuthUserType } = require('../types');
const { AuthUser } = require('../../models/AuthUser');

const authUserQuery = {
  type: new GraphQLList(AuthUserType),
  args: {
    id: {
      name: 'id',
      type: GraphQLString,
    },
  },
  resolve: (_, args) => AuthUser.findAll({ where: args }),
};

module.exports = { authUserQuery };
