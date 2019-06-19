const Sequelize = require('sequelize');
const sequelize = require('../dao/pg-connector');

class OAuthAccessToken extends Sequelize.Model{}
OAuthAccessToken.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      access_token: Sequelize.STRING,
      expires: Sequelize.DATE,
      scope: Sequelize.STRING,
      client_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER
    },
    { sequelize, modelName: 'oauth_access_tokens' });

module.exports = OAuthAccessToken;

