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
  },
  { tableName },
);

sequelizePaginate.paginate(Person);

Person.pagination = async ({ page, limit }) => {
  const options = {
    page: +page, // Default 1
    paginate: +limit, // Default 25
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
};

module.exports = { Person };
