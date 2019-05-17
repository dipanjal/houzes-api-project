const Sequelize = require('sequelize');
const sequelize = require('../../../db/connectors/seq-pg-connector');

class OAuthRefreshToken extends Sequelize.Model{}
OAuthRefreshToken.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      refresh_token: Sequelize.TEXT,
      expires: Sequelize.DATE,
      scope: Sequelize.TEXT,
      client_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER
},
{sequelize, modelName: 'oauth_refresh_tokens'});

module.exports = OAuthRefreshToken;