const Sequelize = require('sequelize');
const sequelize = require('../../../db/connectors/seq-pg-connector');

class OAuthClient extends Sequelize.Model{}
OAuthClient.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    name: Sequelize.TEXT,
    client_id: {
        type: Sequelize.TEXT,
        unique: true
    },
    client_secret: Sequelize.TEXT,
    redirect_uri: Sequelize.TEXT,
    grant_types: Sequelize.TEXT,
    scope: Sequelize.TEXT,
    user_id: Sequelize.INTEGER
},
{sequelize, modelName: 'oauth_clients'});

module.exports = OAuthClient;