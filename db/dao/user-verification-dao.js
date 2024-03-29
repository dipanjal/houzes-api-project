const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector'),
    UserVerificationModel = require('../models').UserVerificationModel,
    UserModel = require('../../modules/oauth/auth_models').User;

VerificationCodeDao = function () {};



VerificationCodeDao.save = (VerificationCodeData) => {
    console.log('save verification code');
    return new Promise( (resolve,reject) => {
        UserVerificationModel.create(VerificationCodeData)
            .then(data => resolve(data))
            .catch(err=> reject(err));
    });
};


VerificationCodeDao.markAsUsed = (verificationCodeModel) => {
    return new Promise( (resolve,reject) => {
        console.log('mark as used');
        verificationCodeModel.update(
            {is_used: true},
            {where: verificationCodeModel.id}
        ).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });

        // {
        //     where: {
        //         code:verificationCodeModel.code,
        //             user_id:verificationCodeModel.user.id
        //     }
        // }

    });
};


VerificationCodeDao.checkToken = (code, type) => {
    return new Promise((resolve,reject) => {
        UserVerificationModel.findOne({
            where:{
                code:code,
                is_used:false,
                verification_type: type,
                expires_at: {[Sequelize.Op.gte]:new Date()}
            },
            include: [{
                model:UserModel,
                attributes: ['id', 'email', 'first_name', 'last_name']
            }]
        }).then(verificationCode => {
            // resolve(data);
            if (verificationCode){
                /**
                 * update the verification code status
                 */
                return verificationCode.update({is_used: true},{where: verificationCode.id});
            }else{
                resolve(verificationCode);
            }
        }).then(verificationCode=>{
            resolve(verificationCode)
        }).catch(err => reject(err));
    });
};

module.exports = VerificationCodeDao;