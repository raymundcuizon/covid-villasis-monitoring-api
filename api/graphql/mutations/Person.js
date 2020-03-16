const uuidv1 = require('uuid/v1');
const shortid = require('shortid');

const { GraphQLString, GraphQLNonNull } = require('graphql');
const { formatErrors } = require('../../services/formatErrors');
const { personMutationResponse } = require('../types/MutationResponseType');
const { LocationInputType, MonitoringInputType } = require('../inputTypes');

const createPerson = {
  type: personMutationResponse,
  args: {
    firstname: {
      name: 'firstname',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastname: {
      name: 'lastname',
      type: new GraphQLNonNull(GraphQLString),
    },
    middlename: {
      name: 'middlename',
      type: new GraphQLNonNull(GraphQLString),
    },
    origin: {
      name: 'origin',
      type: new GraphQLNonNull(GraphQLString),
    },
    age: {
      name: 'age',
      type: new GraphQLNonNull(GraphQLString),
    },
    gender: {
      name: 'gender',
      type: new GraphQLNonNull(GraphQLString),
    },
    monitoring: {
      name: 'monitoring',
      type: MonitoringInputType,
    },
    location: {
      name: 'location',
      type: LocationInputType,
    },
  },
  resolve: async (_, args, { models }) => {
    try {
      const {
        firstname,
        middlename,
        lastname,
        origin,
        age,
        gender,
        monitoring,
        location,
      } = args;

      const response = await models.sequelize.transaction(async (t) => {
        const personData = {
          id: uuidv1(),
          pid: shortid.generate(),
          firstname,
          middlename,
          lastname,
          age,
          gender,
          origin,
        };

        const crtPerson = await models.Person.create(personData, { transaction: t });
        await models.Monitoring.create({
          id: uuidv1(),
          person_id: crtPerson.id,
          ...monitoring,
        }, { transaction: t });
        await models.Location.create({
          id: uuidv1(),
          person_id: crtPerson.id,
          ...location,
        }, { transaction: t });
        return {
          ok: true,
          person: crtPerson,
        };
      });

      return response;
    } catch (err) {
      return {
        ok: false,
        errors: formatErrors(err),
      };
    }
  },
};

const updateLocation = {
  type: personMutationResponse,
  args: {
    pid: {
      name: 'person id',
      type: new GraphQLNonNull(GraphQLString),
    },
    location: {
      name: 'location',
      type: LocationInputType,
    },
  },
  resolve: async (_, { pid, location }, { models }) => {
    try {
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
      await models.Location.create({
        id: uuidv1(),
        person_id: foundPerson.id,
        ...location,
      });
      return {
        ok: true,
        person: foundPerson,
      };
    } catch (err) {
      return {
        ok: false,
        errors: formatErrors(err),
      };
    }
  },
};

const updateMonitoring = {
  type: personMutationResponse,
  args: {
    pid: {
      name: 'person id',
      type: new GraphQLNonNull(GraphQLString),
    },
    monitoring: {
      name: 'monitoring',
      type: MonitoringInputType,
    },
  },
  resolve: async (_, { pid, monitoring }, { models }) => {
    try {
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

      await models.Monitoring.create({
        id: uuidv1(),
        person_id: foundPerson.id,
        ...monitoring,
      });
      return {
        ok: true,
        person: foundPerson,
      };
    } catch (err) {
      return {
        ok: false,
        errors: formatErrors(err),
      };
    }
  },
};

module.exports = { createPerson, updateLocation, updateMonitoring };
