/**
 * url: /api/v1/public/
 * @type {Router}
 */

const router = require('express').Router();

let hashUtlis = require('../../../components/utils/hash-utils');
const UserDao = require('../../../db/dao/user-dao'),
    UserVerificationDao = require('../../../db/dao/user-verification-dao'),
    validator = require('../../../middlewares/validator'),
    ApiResponse = require('../../../components/view-models').ApiResponse;

let isUserValid = validator.isUserValid;
let isEmailExist = validator.isEmailExist;
let isPhoneExist = validator.isPhoneExist;

router.post('/user/register', isUserValid,isEmailExist,isPhoneExist,(req, res) => {

    let body = req.body;
    let UserData = {
        email: body.email,
        password: hashUtlis.generateMD5Hash(body.password),
        first_name: body.first_name,
        last_name: body.last_name,
        phone:body.phone,
        scope: body.scope == null ? 'default' : body.scope
    };
    UserDao.saveOAuthUser(UserData)
        .then(user => res.json(new ApiResponse(200,'registration successful',user)))
        .catch(err => res.json(new ApiResponse(500,'error',err)))
});

router.post('/reset-password', (req, res) => {
    UserDao.findUserByEmail(req.body.email).then(user => {
        if(user){
            user = user.toJSON();
            delete user.password;

            let otpUtils = require('../../../components').utils.otpUtils;
            let opt = otpUtils.generateOTP();

            let data = {
                subject: 'Hello Testing!!',
                token: opt,
                url: `http://localhost:3000/api/v1/public/reset-password/token/${opt}`
            };

            let mailer = require('../../../modules/mailer');
            mailer.sendPasswordResetEmail(user, data,(err, mailResp) => {
                if(err){res.status(err.code).send(err)}
                else{
                    let verificationTypes = require('../../../components/enums/verification-types-enum');

                    let otpData = {
                        code:data.token,
                        user_id: user.id,
                        expires_at: otpUtils.getOTPLifeTime(),
                        verification_type:verificationTypes.PASSWORD_RESET
                    };

                    UserVerificationDao.save(otpData).then(data => {
                        res.json(new ApiResponse(200,'email sent successfully!',data));
                    }).catch(err => {
                        res.status(err.code).send(err);
                    });
                }
            });

        }else{
            res.status(400).json(new ApiResponse(400,'no email found'))
        }
    }).catch(err => {
        let errCode = err.code||500;
        res.status(errCode)
            .json(new ApiResponse(errCode,err.message));
    });
});

router.get('/reset-password/token/:token', (req,res) => {
    UserVerificationDao.validateToken(req.params.token).then(data => {
        if (data) res.json(new ApiResponse(200,'user verified! ',data));
        else res.status(401).json(new ApiResponse(401,'token expired!'));
    }).catch(err => {
        res.status(err.code).json(new ApiResponse(err.code,err.message))
    });
});

module.exports = router;