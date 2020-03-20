const Sequelize = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const sequelize = require('../../config/database');

const tableName = 'persons';

const Person = sequelize.define(
  'Person',
  {
    id: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
    },
    pid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    middlename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
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

sequelizePaginate.paginate(Person);

Person.pagination = async ({ page, limit }, whereCon = false) => {
  const where = (whereCon) || {};
  const options = {
    page: +page, // Default 1
    paginate: +limit, // Default 25
    where,
  };

  const { docs, pages, total } = await Person.paginate(options);
  const before = page > 1 ? +page - 1 : 1;
  const next = page < total ? +page + 1 : total;

  return {
    data_list: docs,
    pagination: {
      pages, total, before, next,
    },
  };
};

Person.associate = (models) => {
  models.Person.hasMany(models.Monitoring, { as: 'monitorings', foreignKey: 'person_id' });
  models.Person.hasMany(models.Location, { as: 'locations', foreignKey: 'person_id' });
  models.Person.hasMany(models.StatusHistory, { as: 'statusHistory', foreignKey: 'person_id' });
};

module.exports = { Person };
