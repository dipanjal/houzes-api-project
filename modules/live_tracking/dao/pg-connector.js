const Sequelize = require('sequelize');

/** @todo
 * move this connection to a config file 
 * load it from factory
 */

const config = require('../../../config');
const pgConfig = config.SequelizeDBConfig;


const sequelize = new Sequelize(pgConfig.database,
                                  pgConfig.username,
                                  pgConfig.password,
                                  pgConfig);


module.exports = sequelize;