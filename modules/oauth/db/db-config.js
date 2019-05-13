// pgConfig = {
//     database: 'houzes_api',
//     // database: 'postgres',
//     username: 'postgres',
//     password: 'abc123',
//     dialect: 'postgres', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
//     logging: console.log,
//     timezone: '+06:00',
//   };

pgConfig = {
  database: 'ra_houzes',
  username: 'wsit',
  password: 'wsit',
  dialect: 'postgres', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
  logging: console.log,
  timezone: '+06:00',
}

module.exports = pgConfig;