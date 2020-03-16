const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'monitorings';

const Monitoring = sequelize.define(
  'Monitoring',
  {
    id: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
    },
    body_temp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    symptoms: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    others: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { tableName },
);


module.exports = { Monitoring };
