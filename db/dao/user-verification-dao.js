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


VerificationCodeDao.validateToken = (code, type) => {
    return new Promise((resolve,reject) => {
        UserVerificationModel.findOne({
            where:{
                code:code,
                is_used:false,
                verification_type: type,
                // expires_at: {[Sequelize.Op.gte]:new Date()}
            },
            include: [{
                model:UserModel,
                attributes: ['id', 'email', 'first_name', 'last_name']
            }]
        }).then(verificationCode => {
            if (verificationCode){
                // VerificationCodeDao.markAsUsed(verificationCode)
                //     .then(data => {
                //         console.log('data received');
                //         resolve(data);
                //     })
                //     .catch(err=>reject(err));
                /**
                 * update the verification code
                 */
                return verificationCode.update({is_used: true},{where: verificationCode.id});
            }else{
                resolve(verificationCode);
            }
        }).then(updated => {
            // console.log('verification code updated!!');
            resolve(updated);
        }).catch(err => reject(err));
    });
};

UserVerificationModel.invalidateTokens = () => {

};

module.exports = VerificationCodeDao;