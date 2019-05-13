sequelize = require('../connectors/seq-pg-connector');

/**
 * Sequelize Models or Entities
 * @type {{User, OAuthClient, OAuthRefreshToken, OAuthAccessToken, OAuthAuthorizationCode}}
 * All of these models are associated with oAuth
 */

let sequelizeModels = require('../sequlizer_models');
let User = sequelizeModels.User,
    OAuthAccessToken = sequelizeModels.OAuthAccessToken,
    OAuthClient = sequelizeModels.OAuthClient,
    OAuthAuthorizationCode = sequelizeModels.OAuthAuthorizationCode,
    OAuthRefreshToken = sequelizeModels.OAuthRefreshToken;

// const cls = require('continuation-local-storage'),
//     namespace = cls.createNamespace('my-very-own-namespace');

let context = this;
let oAuthDao = function(){};

/**
 * USER START
 */
oAuthDao.findByUserName = (userName,callback) => {
    console.log('findByUserName()');
    User.findOne({
        where:{username:userName},
        attributes: ['id', 'username', 'password', 'scope']
    }).then(user => {
        callback(null, user);
    }).catch( err => {
        console.log("findByUserName - Err: ", err);
        callback(err,null);
    });
};

oAuthDao.findUserByUserNameAndPassword = (userName, password, callback) => {
    console.log('findByUserName()');
    User.findOne({
        where:{username:userName},
        attributes: ['id', 'username', 'password', 'scope']
    }).then(user => {
        user.password === password ? callback(null, user) : callback(null,null);
        // return user.password === password ? user : null;
    }).catch( err => {
        console.log("findUserByUserNameAndPassword - Err: ", err);
        callback(err,null);
        // return null;
    });
};

/**
 * User ==> saveOAuthUser()
 */

oAuthDao.saveOAuthUser = (UserData, callback) => {
    User.create({
        username: UserData.username,
        password: UserData.password,
        scope: UserData.scope
    }).then(user => {
        callback(null,user);
    }).catch(err => {
        callback(err,null);
    });
};

/**
 * OAuthAccessToken ==> findAllAccessTokens()
 */
oAuthDao.findAllAccessTokens = (callback) => {
    OAuthAccessToken.findAll({
        // attributes: ['id', 'access_token']
    }).then(oAuthAccessToken => {
        callback(null,oAuthAccessToken);
    }).catch(err => {
        console.log("findAllAccessTokens - Err: ", err);
        callback(err,null);
    });
};


/**
 * OAuthAccessToken ==> findAccessTokenByBearerToken()
 */
oAuthDao.findAccessTokenByBearerToken = (bearerToken,callback) => {
    OAuthAccessToken.findOne({
        where: {access_token: bearerToken}
    }).then( obj => {
        callback(null,obj);
    }).catch( err => {
        console.log("getAccessToken - Err: ", err);
        callback(err,null);
    });
};

oAuthDao.saveOAuthClient = (UserData, OAuthClientData, callback) => {

    oAuthDao.findUserByUserNameAndPassword(UserData.username,UserData.password,(err,user) => {
        user = user.toJSON();
        if (err){
            callback(err,null);
        }
        OAuthClient.create({
            name:OAuthClientData.client_name,
            client_id:OAuthClientData.client_id,
            client_secret:OAuthClientData.client_secret,
            scope: user.scope,
            user_id: user.id
        }).then(oauthClient =>{
            callback(null,oauthClient);
        }).catch(err => {
            callback(err,null);
        });
    });
};


module.exports = oAuthDao;