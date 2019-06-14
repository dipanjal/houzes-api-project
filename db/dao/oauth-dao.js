// let sequelize = require('../connectors/seq-pg-connector');

/**
 * Sequelize Models or Entities
 * @type {{User, OAuthClient, OAuthRefreshToken, OAuthAccessToken, OAuthAuthorizationCode}}
 * All of these models are associated with oAuth
 */

let sequelizeModels = require('../../modules/oauth/auth_models');

let User = sequelizeModels.User,
    OAuthAccessToken = sequelizeModels.OAuthAccessToken,
    OAuthClient = sequelizeModels.OAuthClient,
    OAuthAuthorizationCode = sequelizeModels.OAuthAuthorizationCode,
    OAuthRefreshToken = sequelizeModels.OAuthRefreshToken;

let hashUtlis = require('../../components/utils/hash-utils');
let oAuthDao = function(){};

/**
 * USER START
 */
oAuthDao.findUserByEmail = (email, callback) => {
    console.log('findUserByEmail()');
    User.findOne({
        where:{email:email},
        // attributes: ['id', 'username', 'password', 'scope']
    }).then(user => {
        callback(null, user);
    }).catch( err => {
        console.log("findUserByEmail - Err: ", err);
        callback(err,null);
    });
};

oAuthDao.findUserByEmailAndPassword = (email, password, callback) => {
    console.log('findUserByEmail()');
    User.findOne({
        where:{email:email},
        attributes: ['id', 'email', 'password', 'scope']
    }).then(user => {
        if (user){
            if (hashUtlis.isEqualMD5Hash(password,user.password)){
                callback(null, user)
            } else {
                callback('wrong password', null);
            }
        }else{
            callback("wrong email or password", null);
        }

        // user.password === password ? callback(null, user) : callback(null,null);
        // return user.password === password ? user : null;
    }).catch( err => {
        console.log("findUserByEmailAndPassword - Err: ", err);
        callback(err,null);
        // return null;
    });
};

/**
 * User ==> saveOAuthUser()
 */

oAuthDao.saveOAuthUser = (UserData, callback) => {
    User.create(UserData).then(user => {
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

oAuthDao.findClientByClientId = (client_id,callback) => {
    OAuthClient.findOne({
        where: {client_id: client_id}
    }).then( oAuthClient => {
        callback(null,oAuthClient);
    }).catch( err => {
        console.log("getAccessToken - Err: ", err);
        callback(err,null);
    });
};

oAuthDao.saveOAuthClient = (UserData, OAuthClientData) => {
    return new Promise((resolve, reject) => {
        oAuthDao.findUserByEmailAndPassword(UserData.email,UserData.password,(err, user) => {
            if (err){
                reject(err)
                // callback(err,null);
            }
            else if (user) {
                user = user.toJSON();
                OAuthClient.create({
                    name:OAuthClientData.client_name,
                    client_id:OAuthClientData.client_id,
                    client_secret:OAuthClientData.client_secret,
                    scope: user.scope,
                    user_id: user.id
                }).then(oauthClient =>{
                    resolve(oauthClient)
                    // callback(null,oauthClient);
                }).catch(err => {
                    reject(err)
                    // callback(err,null);
                });
            }else{
                reject('no user found')
                // callback("no user found",null);
            }
        });
    });
};

// oAuthDao.saveOAuthClient = (UserData, OAuthClientData, callback) => {
//
//     oAuthDao.findUserByEmailAndPassword(UserData.email,UserData.password,(err, user) => {
//         user = user.toJSON();
//         if (err){
//             callback(err,null);
//         }
//         else if (user) {
//             OAuthClient.create({
//                 name:OAuthClientData.client_name,
//                 client_id:OAuthClientData.client_id,
//                 client_secret:OAuthClientData.client_secret,
//                 scope: user.scope,
//                 user_id: user.id
//             }).then(oauthClient =>{
//                 callback(null,oauthClient);
//             }).catch(err => {
//                 callback(err,null);
//             });
//         }else{
//             callback("no user found",null);
//         }
//
//     });
// };


module.exports = oAuthDao;