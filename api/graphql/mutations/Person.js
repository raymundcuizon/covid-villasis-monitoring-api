const uuidv1 = require('uuid/v1');
const shortid = require('shortid');

const { GraphQLString, GraphQLNonNull } = require('graphql');
const { formatErrors } = require('../../services/formatErrors');
const { personMutationResponse } = require('../types/MutationResponseType');
const { LocationInputType, MonitoringInputType } = require('../inputTypes');
const { personStatusType } = require('../sharedTypes/PersonStatusType');

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
    status: {
      name: 'status',
      type: new GraphQLNonNull(personStatusType),
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
        status,
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
          status,
          ...monitoring,
          ...location,
        };

        const crtPerson = await models.Person.create(personData, { transaction: t });

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

      const response = await models.sequelize.transaction(async (t) => {
        await models.Location.create({
          id: uuidv1(),
          person_id: foundPerson.id,
          address: foundPerson.address,
          barangay: foundPerson.barangay,
          city_town: foundPerson.city_town,
          province: foundPerson.province,
        }, { transaction: t });

        const updateFoundPerson = await foundPerson.update({ ...location }, { transaction: t });

        return {
          ok: true,
          person: updateFoundPerson,
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
      const response = await models.sequelize.transaction(async (t) => {
        await models.Monitoring.create({
          id: uuidv1(),
          person_id: foundPerson.id,
          body_temp: foundPerson.body_temp,
          symptoms: foundPerson.symptoms,
          others: foundPerson.others,
        }, { transaction: t });

        const updateFoundPerson = await foundPerson.update({ ...monitoring }, { transaction: t });

        return {
          ok: true,
          person: updateFoundPerson,
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

const updateStatus = {
  type: personMutationResponse,
  args: {
    pid: {
      name: 'person id',
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      name: 'status',
      type: new GraphQLNonNull(personStatusType),
    },
  },
  resolve: async (_, { pid, status }, { models }) => {
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
      const response = await models.sequelize.transaction(async (t) => {
        await models.StatusHistory.create({
          id: uuidv1(),
          person_id: foundPerson.id,
          status: foundPerson.status,
        }, { transaction: t });

        const updateFoundPerson = await foundPerson.update({
          status,
        }, { transaction: t });

        return {
          ok: true,
          person: updateFoundPerson,
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

module.exports = {
  createPerson,
  updateLocation,
  updateMonitoring,
  updateStatus,
};
