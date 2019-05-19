const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector');
let VerificationCodeModel = require('../models').VerificationCodeModel;

VerificationCodeDao = function () {};



VerificationCodeDao.saveOrUpdate = (VerificationCodeData) => {
    console.log('save verification code');
    return new Promise( (resolve,reject) => {
        VerificationCodeModel.create({
            code:VerificationCodeData.code,
            user_email: VerificationCodeData.user_email,
            expired_at: VerificationCodeData.expired_at,
            verification_type: VerificationCodeData.verification_type
        }).then(data => resolve(data))
            .catch(err=> reject(err));

    });
};


VerificationCodeDao.validateToken = (code, user_email) => {
    return new Promise((resolve,reject) => {
        VerificationCodeModel.findOne({
            where:{
                code:code,
                user_email: user_email,
                expired_at: {
                    [Sequelize.Op.gte]:new Date()
                }
            }
        }).then(verificationCode => {
            resolve(verificationCode);

        }).catch(err => reject(err));
    });



};

module.exports = VerificationCodeDao;