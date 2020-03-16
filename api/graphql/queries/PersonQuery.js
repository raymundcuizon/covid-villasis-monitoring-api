const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const { PersonType } = require('../types/PersonType');
const { PersonQueryResponseType } = require('../types/QueryResponseType');

const getPersons = {
  type: PersonQueryResponseType,
  args: {
    page: {
      name: 'page',
      type: new GraphQLNonNull(GraphQLInt),
    },
    limit: {
      name: 'limit',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (_, args, { models }) => {
    const data = await models.Person.pagination(args);
    return {
      ok: true,
      persons: data.data_list,
      pagination: data.pagination,
    };
  },
};

const getPerson = {
  type: PersonType,
  args: {
    pid: {
      name: 'person id',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { pid }, { models }) => {
    const foundPerson = await models.Person.findOne({ where: { pid } });

    if (!foundPerson) {
      return {
        ok: false,
        errors: [{
          path: 'foundPerson',
          message: 'Pid does not exist',
        }],
      };
    }

    return foundPerson;
  },
};

module.exports = { getPersons, getPerson };
