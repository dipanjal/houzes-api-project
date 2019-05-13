const Sequelize = require('sequelize');

/** @todo
 * move this connection to a config file 
 * load it from factory
 */

// const factory = require('../../factory');
const config = require('../../../../config')
const pgConfig = config.SequelizeDBConfig;
// const pgConfig = require('../db-config');


const sequelize = new Sequelize(pgConfig.database,
                                  pgConfig.username,
                                  pgConfig.password,
                                  pgConfig);

// sequelize.authenticate().then( obj =>{
//     console.log('db connected');
// }).catch( err =>{
//     console.log('connection err: ',err);
// });

module.exports = sequelize;