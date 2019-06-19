
let UserModel = require('./OAuthUserModel'),
    OAuthAccessTokenModel = require('./OAuthAccessTokenModel'),
    OAuthClientModel = require('./OAuthClientModel'),
    UserLocationModel = require('./UserLocationModel'),
    UserSocketModel = require('./UserSocketModel');


/**
 * Set Relationships
 */


OAuthAccessTokenModel.belongsTo(UserModel,{foreignKey: 'user_id'});
OAuthAccessTokenModel.belongsTo(OAuthClientModel,{foreignKey: 'client_id'});

UserLocationModel.belongsTo(UserModel,{foreignKey: 'user_id'});
UserSocketModel.belongsTo(UserModel,{foreignKey: 'user_id'});

var models = {
    UserModel,
    UserLocationModel,
    UserSocketModel,
    OAuthAccessTokenModel,
    OAuthClientModel
};

module.exports = models;


