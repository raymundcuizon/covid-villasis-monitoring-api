const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'locations';

const Location = sequelize.define(
  'Location',
  {
    id: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    barangay: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city_town: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { tableName },
);

module.exports = { Location };
