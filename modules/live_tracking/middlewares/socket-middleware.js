const Sequelize = require('sequelize');
const OAuthAccessTokenModel = require('../models').OAuthAccessTokenModel,
    OAuthClientModel = require('../models').OAuthClientModel,
    UserModel = require('../models').UserModel;
    // UserSocketModel = require('../models').UserSocketModel;

/**
 * AUTHENTICATE SOCKET BY ACCESS TOKEN
 * @param socket
 * @param next
 * @returns {Promise<T | never>}
 */
module.exports.authenticateSocket = (socket, next) => {
    console.log('socket authenticator()');
    let bearerToken = socket.request._query['token'];

    return OAuthAccessTokenModel
        .findOne({
            where: {
                access_token: bearerToken,
                expires: {[Sequelize.Op.gte]:new Date()} //expire date is gather than equal current date
            },
            attributes: [['access_token', 'accessToken'], ['expires', 'accessTokenExpiresAt'],'scope'],
            include: [
                OAuthClientModel,
                {
                    model: UserModel,
                    where:{status:'activated'}
                }
            ]
        }).then( accessToken => {
            if(accessToken) {
                socket.access_token = accessToken; //save access token object for further usage
                next();
            }
            else next(new Error('unauthorized'));
        }).catch(err => next(err));
};

/**
 * when client/user connect to socket
 * save or update client's socket id
 * @param socket
 * @param next
 */
module.exports.saveOrUpdateUserSocket = (socket, next) => {
    console.log('saveOrUpdateUserSocket()');
    let currentSocketUser = socket.access_token.user.id;
    let currentSocketId = socket.id;

    require('../dao/UserSocketDao').saveOrUpdate(currentSocketUser,currentSocketId)
        .then(userSocketUpdated=>{
            socket.user_socket = userSocketUpdated;
            next();
        }).catch(err => next(err));
};