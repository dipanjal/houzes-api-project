const Sequelize = require('sequelize');
const sequelize = require('../../../db/connectors/seq-pg-connector');

class OAuthAuthorizationCode extends Sequelize.Model{}
OAuthAuthorizationCode.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    authorization_code: Sequelize.TEXT,
    expires: Sequelize.DATE,
    redirect_uri: Sequelize.TEXT,
    scope: Sequelize.TEXT,
    client_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
},
{sequelize, modelName: 'oauth_authorization_codes'});

module.exports = OAuthAuthorizationCode;