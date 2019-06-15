const Sequelize = require('sequelize');
const OAuthAccessTokenModel = require('../models').OAuthAccessTokenModel,
    OAuthClientModel = require('../models').OAuthClientModel,
    UserModel = require('../models').UserModel;

module.exports.authenticateSocket = function (socket, next) {
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
            if(accessToken) next();
            else next(new Error('unauthorized'));
        }).catch(err => next(err));

    // return UserDao.findActivatedUserByEmail(email).then(user =>{
    //     if(user) next();
    //     else next(new Error('unauthorized'))
    // }).catch(err => next(err));
};