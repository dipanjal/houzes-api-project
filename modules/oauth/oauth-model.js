let _ = require('lodash');

/** @todo load from factory */

let sequelizeModels = require('./auth_models');
let hashUtlis = require('../../components/utils/hash-utils'),
    userStatusTypes = require('../../components/enums/user-status-types-enum');


let User = sequelizeModels.User,
    OAuthAccessToken = sequelizeModels.OAuthAccessToken,
    OAuthClient = sequelizeModels.OAuthClient,
    OAuthAuthorizationCode = sequelizeModels.OAuthAuthorizationCode,
    OAuthRefreshToken = sequelizeModels.OAuthRefreshToken;

function getAccessToken(bearerToken) {
  console.log('getAccessToken()');
  return OAuthAccessToken
    .findOne({
      where: {access_token: bearerToken},
      attributes: [['access_token', 'accessToken'], ['expires', 'accessTokenExpiresAt'],'scope'],
      include: [
        // {
        //   model: User,
        //   attributes: ['id', 'username'],
        // }, OAuthClient
          OAuthClient,
          {
              model: User,
              where:{status:userStatusTypes.ACTIVATED}
          }

      ]
    })
    .then(function (accessToken) {
      // console.log(accessToken);
      if (!accessToken) {
        return false;
      }
      let token = accessToken.toJSON();
      // token.user = token.oauth_user;
      // delete token.oauth_user;
      // token.client = token.oauth_client;
      return token;
    })
    .catch(function (err) {
      console.log("getAccessToken - Err: ",err);
    });
}


function getClient(clientId, clientSecret) {
    console.log('getClient()');
    const options = {
        where: {client_id: clientId},
        attributes: ['id', 'client_id', 'redirect_uri', 'scope'],
    };
    if (clientSecret) options.where.client_secret = clientSecret;

    return OAuthClient.findOne(options)
        .then(function (client) {
            if (!client) return new Error("client not found");
            let clientWithGrants = client.toJSON();
            clientWithGrants.grants = ['authorization_code', 'password', 'refresh_token', 'client_credentials']
            // Todo: need to create another table for redirect URIs
            clientWithGrants.redirectUris = [clientWithGrants.redirect_uri];
            delete clientWithGrants.redirect_uri;
            //clientWithGrants.refreshTokenLifetime = integer optional
            //clientWithGrants.accessTokenLifetime  = integer optional
            return clientWithGrants
        }).catch(function (err) {
            console.log("getClient - Err: ", err)
        });
}


function getUser(username, password) {
    console.log('getUser()');
    return User
        .findOne({
            where: {email: username},
            attributes: ['id', 'email', 'password', 'scope'],
        })
        .then(function (user) {
            // return user.password == password ? user.toJSON() : false;
            return hashUtlis.isEqualMD5Hash(password,user.password) ? user.toJSON() : false;
        })
        .catch(function (err) {
            console.log("getUser - Err: ", err)
        });
}

function revokeAuthorizationCode(code) {
    console.log('revokeAuthorizationCode()');
    return OAuthAuthorizationCode.findOne({
        where: {
            authorization_code: code.code
        }
    }).then(function (rCode) {
        //if(rCode) rCode.destroy();
        /***
         * As per the discussion we need set older date
         * revokeToken will expected return a boolean in future version
         * https://github.com/oauthjs/node-oauth2-server/pull/274
         * https://github.com/oauthjs/node-oauth2-server/issues/290
         */
        var expiredCode = code
        expiredCode.expiresAt = new Date('2015-05-28T06:59:53.000Z')
        return expiredCode
    }).catch(function (err) {
        console.log("getUser - Err: ", err)
    });
}

function revokeToken(token) {
    console.log('revokeToken()');
    return OAuthRefreshToken.findOne({
        where: {
            refresh_token: token.refreshToken
        }
    }).then(function (rT) {
        if (rT) rT.destroy();
        /***
         * As per the discussion we need set older date
         * revokeToken will expected return a boolean in future version
         * https://github.com/oauthjs/node-oauth2-server/pull/274
         * https://github.com/oauthjs/node-oauth2-server/issues/290
         */
        var expiredToken = token;
        expiredToken.refreshTokenExpiresAt = new Date('2015-05-28T06:59:53.000Z')
        return expiredToken
    }).catch(function (err) {
        console.log("revokeToken - Err: ", err)
    });
}


function saveToken(token, client, user) {
    console.log('saveToken()');
    return Promise.all([
        OAuthAccessToken.create({
            access_token: token.accessToken,
            expires: token.accessTokenExpiresAt,
            client_id: client.id,
            user_id: user.id,
            scope: token.scope
        }),
        token.refreshToken ? OAuthRefreshToken.create({ // no refresh token for client_credentials
            refresh_token: token.refreshToken,
            expires: token.refreshTokenExpiresAt,
            client_id: client.id,
            user_id: user.id,
            scope: token.scope
        }) : [],

    ])
        .then(function (resultsArray) {
            return _.assign(  // expected to return client and user, but not returning
                {
                    client: client,
                    user: user,
                    access_token: token.accessToken, // proxy
                    refresh_token: token.refreshToken, // proxy
                },
                token
            )
        })
        .catch(function (err) {
            console.log("revokeToken - Err: ", err)
        });
}

function getAuthorizationCode(code) {
    console.log('getAuthCode()');
    return OAuthAuthorizationCode
        .findOne({
            attributes: ['client_id', 'expires', 'user_id', 'scope'],
            where: {authorization_code: code},
            include: [User, OAuthClient]
        })
        .then(function (authCodeModel) {
            if (!authCodeModel) return false;
            var client = authCodeModel.OAuthClient.toJSON()
            var user = authCodeModel.User.toJSON()
            return reCode = {
                code: code,
                client: client,
                expiresAt: authCodeModel.expires,
                redirectUri: client.redirect_uri,
                user: user,
                scope: authCodeModel.scope,
            };
        }).catch(function (err) {
            console.log("getAuthorizationCode - Err: ", err)
        });
}

function saveAuthorizationCode(code, client, user) {
    console.log('saveAuthCode()');
    return OAuthAuthorizationCode
        .create({
            expires: code.expiresAt,
            client_id: client.id,
            authorization_code: code.authorizationCode,
            user_id: user.id,
            scope: code.scope
        })
        .then(function () {
            code.code = code.authorizationCode
            return code
        }).catch(function (err) {
            console.log("saveAuthorizationCode - Err: ", err)
        });
}

function getUserFromClient(client) {
    console.log('getUserFromClient()');
    var options = {
        where: {client_id: client.client_id},
        include: [User],
        attributes: ['id', 'client_id', 'redirect_uri'],
    };
    if (client.client_secret) options.where.client_secret = client.client_secret;

    return OAuthClient
        .findOne(options)
        .then(function (client) {
            if (!client) return false;
            if (!client.User) return false;
            return client.User.toJSON();
        }).catch(function (err) {
            console.log("getUserFromClient - Err: ", err)
        });
}

function getRefreshToken(refreshToken) {
    console.log('getRefreshToken()');
    if (!refreshToken || refreshToken === 'undefined') return false;

    return OAuthRefreshToken
        .findOne({
            attributes: ['client_id', 'user_id', 'expires'],
            where: {refresh_token: refreshToken},
            include: [OAuthClient, {
                model:User,
                attributes: ['id', 'email', 'password', 'scope']
            }]

        })
        .then(function (savedRT) {
            // console.log(savedRT);
            if (savedRT){
                let tokenTemp = {
                    user: savedRT ? savedRT.user.toJSON() : {},
                    client: savedRT ? savedRT.oauth_client.toJSON() : {},
                    refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
                    refreshToken: refreshToken,
                    refresh_token: refreshToken,
                    scope: savedRT.scope
                };
                return tokenTemp;
            }else{
                console.log('getRefreshToken() => refresh_token is null/expired')
                return null;
            }


        }).catch(function (err) {
            console.log("getRefreshToken - Err: ", err)
        });
}

function validateScope(token, client) {
    console.log('validateScope()');
    return true;
    // return (user.scope === scope && client.scope === scope && scope !== null) ? scope : false
}

function verifyScope(token, scope) {
    console.log('varifyScope()');
    return token.scope === scope
}

module.exports = {
    getAccessToken: getAccessToken,
    getAuthorizationCode: getAuthorizationCode, //getOAuthAuthorizationCode renamed to,
    getClient: getClient,
    getRefreshToken: getRefreshToken,
    getUser: getUser,
    getUserFromClient: getUserFromClient,
    //grantTypeAllowed, Removed in oauth2-server 3.0
    revokeAuthorizationCode: revokeAuthorizationCode,
    revokeToken: revokeToken,
    saveToken: saveToken,//saveOAuthAccessToken, renamed to
    saveAuthorizationCode: saveAuthorizationCode, //renamed saveOAuthAuthorizationCode,
    validateScope: validateScope,
    verifyScope: verifyScope,
};

