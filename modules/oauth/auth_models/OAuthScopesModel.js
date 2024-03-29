const Sequelize = require('sequelize/types');
const sequelize = require('../../../db/connectors/seq-pg-connector');

class OAuthScope extends Sequelize.Model{}
OAuthScope.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      scope: Sequelize.TEXT,
      is_default: Sequelize.BOOLEAN
},
{sequelize, modelName: 'oauth_scopes'});

module.exports = OAuthScope;