/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');
const sequelize = require('../../config/database');

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
  },
  { hooks, tableName },
);

AuthUser.prototype.toJSON = () => {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

// AuthUser.associate = (models) => { console.info(models); };

const InitData = {
  systemUser: async () => {
    await AuthUser.create({
      id: 'sys-001',
      username: 'superadmin',
      password: 'superadmin123',
      email: 'admin@sakada.com',
    });
  },
};

module.exports = { AuthUser, InitData };
