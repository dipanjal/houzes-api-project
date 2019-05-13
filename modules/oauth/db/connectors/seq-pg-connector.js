const Sequelize = require('sequelize');

/** @todo
 * move this connection to a config file 
 * load it from factory
 */

// const factory = require('../../factory');
// const pgConfig = factory.dbConfig;

const pgConfig = require('../db-config');


const sequelize = new Sequelize(pgConfig.database,
                                  pgConfig.username,
                                  pgConfig.password,
                                  pgConfig);

module.exports = sequelize;