
let User = require('./OAuthUserModel');
let OAuthAccessToken = require('./OAuthAccessTokenModel');
let OAuthClient = require('./OAuthClientModel');
let OAuthAuthorizationCode = require('./OAuthAuthorizationCodeModel');
let OAuthRefreshToken = require('./OAuthRefreshTokenModel');

/**
 * Set Relationships
 */

OAuthClient.belongsTo(User,{foreignKey: 'user_id'});

OAuthAccessToken.belongsTo(User,{foreignKey: 'user_id'});
OAuthAccessToken.belongsTo(OAuthClient,{foreignKey: 'client_id'});

OAuthRefreshToken.belongsTo(User,{foreignKey: 'user_id'});
OAuthRefreshToken.belongsTo(OAuthClient,{foreignKey: 'client_id'});

OAuthAuthorizationCode.belongsTo(User,{foreignKey: 'user_id'});
OAuthAuthorizationCode.belongsTo(OAuthClient,{foreignKey: 'client_id'});

var sequelizeModels = {
    User: User,
    OAuthAccessToken: OAuthAccessToken,
    OAuthClient: OAuthClient,
    OAuthAuthorizationCode: OAuthAuthorizationCode,
    OAuthRefreshToken: OAuthRefreshToken
};

module.exports = sequelizeModels;


