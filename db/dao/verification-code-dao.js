const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector');
let UserVerificationModel = require('../models').UserVerificationModel;

VerificationCodeDao = function () {};



VerificationCodeDao.save = (VerificationCodeData) => {
    console.log('save verification code');
    return new Promise( (resolve,reject) => {
        UserVerificationModel.create({
            code:VerificationCodeData.code,
            user_email: VerificationCodeData.user_email,
            expired_at: VerificationCodeData.expired_at,
            verification_type: VerificationCodeData.verification_type
        }).then(data => resolve(data))
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


VerificationCodeDao.validateToken = (code, user_email) => {
    return new Promise((resolve,reject) => {
        UserVerificationModel.findOne({
            where:{
                code:code,
                user_email: user_email,
                expired_at: {
                    [Sequelize.Op.gte]:new Date()
                }
            }
        }).then(verificationCode => {
            if (verificationCode){
                VerificationCodeDao.markAsUsed(code,user_email).then(data=> resolve(data)).catch(err=>console.log(err));
                // resolve(verificationCode);
            }else{
                resolve(verificationCode);
            }
        }).catch(err => reject(err));
    });
};

UserVerificationModel.invalidateTokens = () => {

};

module.exports = VerificationCodeDao;