/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');
const lodash = require('lodash');
const bcryptSevice = require('../services/bcrypt.service');
const sequelize = require('../../config/database');
const { brgy } = require('../../config/brgy');

const hooks = {
  beforeCreate(data) {
    data.password = bcryptSevice().password(data);
  },
};

const tableName = 'auth_user';

const AuthUser = sequelize.define(
  'AuthUser',
  {
    id: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    chairman: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contact_person: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_superuser: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    barangay: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    is_activated: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { hooks, tableName },
);

AuthUser.prototype.toJSON = () => {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

const InitData = {
  systemUser: async () => {
    try {
      await AuthUser.create({
        id: 'sys-001',
        username: 'superadmin',
        password: 'superadmin',
        email: 'admin@sample.com',
        is_superuser: true,
        is_activated: true,
        barangay: 'All',
        contact_number: 'N/A',
        contact_person: 'N/A',
        chairman: 'N/A',
      });

      let counter = 1;
      const bulkData = [];
      lodash.forEach(brgy, (value) => {
        const obj = {
          id: `sys-user-${counter}`,
          username: `user00${counter}`,
          password: '$2a$10$NOrDwNXMT.pWGcGHH0MTQOxgGk7c7DRljzwfbL6eU2nlGnhpSbqsC', // user000
          email: `user00${counter}@user.com`,
          is_superuser: false,
          is_activated: false,
          barangay: value.name,
          contact_number: 'N/A',
          contact_person: 'N/A',
          chairman: 'N/A',
        };
        counter += 1;
        bulkData.push(obj);
      });

      await sequelize.transaction(async (t) => {
        await AuthUser.bulkCreate(bulkData, { transaction: t });
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = { AuthUser, InitData };
