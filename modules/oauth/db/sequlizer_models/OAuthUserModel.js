const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector');

class User extends Sequelize.Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    username: Sequelize.TEXT,
    password: Sequelize.TEXT,
    scope: Sequelize.STRING
},
{
    sequelize,
    modelName: 'user',
    tableName: 'oauth_users'
});

module.exports = User;