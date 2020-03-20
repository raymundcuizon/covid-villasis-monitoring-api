const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'status_history';

const StatusHistory = sequelize.define(
  'StatusHistory',
  {
    id: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: [
        'CONFIRMED_CASE',
        'PUI_ADMITTED',
        'PUI_DIED',
        'PUI_DISCHARGED',
        'PUM_UNDER_QUARANTINE',
        'PUM_COMPLETED_QUARANTINE',
        'PUM_DIED',
        'PUM_ADMITTED',
      ],
    },
  },
  { tableName },
);


module.exports = { StatusHistory };
