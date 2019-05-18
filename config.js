/*
module.exports.SequelizeDBConfig = {
    database: 'ra_houzes',
    username: 'postgres',
    password: 'abc123',
    dialect: 'postgres', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
    logging: console.log,
    timezone: '+06:00',
    host: 'localhost',
    port: 5432
};
*/

module.exports.SequelizeDBConfig = {
    database: 'ra_houzes',
    username: 'wsit',
    password: 'wsit',
    dialect: 'postgres', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
    // logging: console.log,
    timezone: '+06:00',
    host: 'localhost',
    port: 5432
};

module.exports.tempTokenLifeTime = (60*60*24)*2;