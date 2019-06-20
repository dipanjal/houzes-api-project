const Sequelize = require('sequelize');

const sequelPGConfig = {
    database: 'ra_houzes',
    username: 'root',
    password: 'wsit97480',
    dialect: 'postgres', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
    timezone: '+06:00',
    host: '172.18.1.11', //private ip
    // host: '58.84.34.65', //public ip
    port: 5454
};


const sequelize = new Sequelize(sequelPGConfig.database,
                                  sequelPGConfig.username,
                                  sequelPGConfig.password,
                                  sequelPGConfig);


module.exports = sequelize;