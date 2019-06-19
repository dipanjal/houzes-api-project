const Sequelize = require('sequelize');
const OAuthAccessTokenModel = require('../models').OAuthAccessTokenModel,
    OAuthClientModel = require('../models').OAuthClientModel,
    UserModel = require('../models').UserModel,
    UserSocketModel = require('../models').UserSocketModel;

module.exports.authenticateSocket = (socket, next) => {
    console.log('socket authenticator()');
    let bearerToken = socket.request._query['token'];

    return OAuthAccessTokenModel
        .findOne({
            where: {
                access_token: bearerToken,
                expires: {[Sequelize.Op.gte]:new Date()}
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
                socket.access_token = accessToken;
                next();
            }
            else next(new Error('unauthorized'));
        }).catch(err => next(err));
};

module.exports.saveOrUpdateUserSocket = (socket, next) => {
    console.log('saveOrUpdateUserSocket()');
    let currentSocketUser = socket.access_token.user;

    UserSocketModel.findOne({
        where:{
            user_id : currentSocketUser.id
        }
    }).then(userSocket=>{
        /**
         * if exist then ==> update
         */
        if(userSocket){
            return userSocket.update({
                    socket_id: socket.id,
                    is_connected: true
                },
                {where: userSocket.id});
        }
        /**
         * create new socket user
         * where is_connected will be true by default
         */
        else{
            let userSocketData = {
                user_id: currentSocketUser.id,
                socket_id: socket.id,
            };
            return UserSocketModel.create(userSocketData);
        }
    }).then(userSocketUpdated => {
        socket.user_socket = userSocketUpdated;
        next();
    }).catch(err => next(err));
};