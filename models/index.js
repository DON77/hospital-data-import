const fs = require('fs');
const config = require('../config');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize = new Sequelize(config.PG_DATABASE, config.PG_USER, config.PG_PASSWORD, {
  host: config.PG_HOST,
  port: config.PG_PORT,
  dialect: 'postgres',
  logging: false,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Patient.Treatment = db.Patient.hasMany(db.Treatment)
db.Treatment.Patient = db.Patient.belongsTo(db.Patient)

module.exports = db;
