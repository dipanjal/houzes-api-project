const Sequelize = require('sequelize');
let sequelize = require('../dao/pg-connector');

const US_PHONE_ENUM = {
    pattern: /^(\+1)?([0-9]{10})$/g,
    sample: '+15417543010',
    message: 'Invalid Phone'
};

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
    status: Sequelize.TEXT,
    phone:{
        type:Sequelize.TEXT,
        allowNull:false,
        unique:true,
        validate:{
            validatePhone: (value) => {
                if(!new RegExp(US_PHONE_ENUM.pattern).test(value)){
                    throw new Error(US_PHONE_ENUM.message+` EX: (${US_PHONE_ENUM.sample})` );
                }
            }
        }
    }
},
{
    sequelize,
    modelName: 'user',
    tableName: 'oauth_users'
});

module.exports = User;