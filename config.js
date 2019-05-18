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

// module.exports.SequelizeDBConfig = {
//     database: 'ra_houzes',
//     username: 'wsit',
//     password: 'wsit',
//     dialect: 'postgres', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
//     // logging: console.log,
//     timezone: '+06:00',
//     host: 'localhost',
//     port: 5432
// };

/**
 * Docker postgres db conf
 * @type {{database: string, password: string, dialect: string, port: number, timezone: string, host: string, username: string}}
 */
module.exports.SequelizeDBConfig = {
    database: 'ra_houzes',
    username: 'root',
    password: 'wsit97480',
    dialect: 'postgres', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
    timezone: '+06:00',
    // host: 'localhost',
    host: '172.18.1.11',
    port: 5454
};

module.exports.otpLifeTime = (60*60*24)*2;