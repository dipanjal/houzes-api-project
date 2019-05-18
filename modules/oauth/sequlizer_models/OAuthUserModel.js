const Sequelize = require('sequelize');
let sequelize = require('../../../db/connectors/seq-pg-connector');

class User extends Sequelize.Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    first_name: Sequelize.TEXT,
    last_name: Sequelize.TEXT,
    email: {
        type: Sequelize.TEXT,
        validate: {
            isEmail:{
                msg: 'invalid email address'
            }
        }
    },
    password: Sequelize.TEXT,
    scope: Sequelize.STRING,
    status: Sequelize.TEXT
},
{
    sequelize,
    modelName: 'user',
    tableName: 'oauth_users'
});

module.exports = User;