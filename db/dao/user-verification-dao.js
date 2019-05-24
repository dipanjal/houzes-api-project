const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector'),
    UserVerificationModel = require('../models').UserVerificationModel,
    UserModel = require('../../modules/oauth/sequlizer_models').User;

VerificationCodeDao = function () {};



VerificationCodeDao.save = (VerificationCodeData) => {
    console.log('save verification code');
    return new Promise( (resolve,reject) => {
        UserVerificationModel.create(VerificationCodeData)
            .then(data => resolve(data))
            .catch(err=> reject(err));
    });
};

VerificationCodeDao.markAsUsed = (code,email) => {
    // let vCodeModel = UserVerificationModel.build({});
    return new Promise( (resolve,reject) => {
        console.log('mark as used');
        UserVerificationModel.update({
            is_used: true,
            where: {code:code,user_email:email,is_used: false}
        })
            .then(data => resolve(data))
            .catch(err => reject(err));
    });


};


VerificationCodeDao.validateToken = (code) => {
    return new Promise((resolve,reject) => {
        UserVerificationModel.findOne({
            where:{
                code:code,
                is_used:false
                // expired_at: {[Sequelize.Op.gte]:new Date()}
            },
            include: [{
                model:UserModel,
                attributes: ['id', 'email', 'first_name', 'last_name']
            }]
        }).then(verificationCode => {
            if (verificationCode){
                // VerificationCodeDao.markAsUsed(code,user_email).then(data=> resolve(data)).catch(err=>console.log(err));
                resolve(verificationCode);
            }else{
                resolve(verificationCode);
            }
        }).catch(err => reject(err));
    });
};

UserVerificationModel.invalidateTokens = () => {

};

module.exports = VerificationCodeDao;