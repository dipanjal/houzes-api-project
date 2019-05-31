/**
 * url: /api/v1/public/
 * @type {Router}
 */

const router = require('express').Router();


const UserDao = require('../../../db/dao/user-dao'),
    UserVerificationDao = require('../../../db/dao/user-verification-dao'),
    validator = require('../../../middlewares/user-validator'),
    verificationTypes = require('../../../components/enums/verification-types-enum');

let hashUtlis = require('../../../components/utils/hash-utils'),
    ApiResponse = require('../../../components/view-models').ApiResponse,
    mailer = require('../../../modules/mailer'),
    otpUtils = require('../../../components/utils/otp-utils');

let isUserValid = validator.isUserValid;
let isEmailExist = validator.isEmailExist;
let isPhoneExist = validator.isPhoneExist;

let BaseUrls = require('../../../config').baseURLs;

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
        .then(user => {
            let opt = otpUtils.generateOTP();

            let data = {
                subject: 'Houzes- User Verification!!',
                token: opt,
                url: `http://${BaseUrls.dev}/api/v1/public/user/verify/token/${opt}`
            };

            mailer.sendUserVerificationEmail(user, data,(err, mailResp) => {
                if(err){res.status(err.code||500).json(new ApiResponse(err.code||500,err.message))}
                else{
                    let otpData = {
                        code:data.token,
                        user_id: user.id,
                        expires_at: otpUtils.getOTPLifeTime(),
                        verification_type:verificationTypes.USER_VERIFICATION
                    };
                    UserVerificationDao.save(otpData).then(data => {
                        res.json(new ApiResponse(200,
                            'A verification link has been send to your email, please confirm your account',
                            data));
                        }).catch(err => {
                            res.status(err.code).send(err);
                    });
                }
            });
        }).catch(err => res.json(new ApiResponse(500,'error',err)))
});

router.get('/user/verify/token/:token', (req,res) => {
    UserVerificationDao.checkToken(req.params.token, verificationTypes.USER_VERIFICATION)
        .then(verificationData => {
            if (verificationData) {
                UserDao.activeateUser(verificationData.user_id).then(userData => {
                    res.json(new ApiResponse(200,'User Activated',userData));
                }).catch( err => {
                    res.send(err)
                });
            }
            else res.status(401).json(new ApiResponse(401,'token invalidate or expired!'));
        }).catch(err => {
            let errCode = err.code || 500;
            res.status(errCode).json(new ApiResponse(errCode,err.message))
    });
});


/**
 * RESET PASSWORD CONFIRMED
 * Need to work with angular project
 * web project will call the api not requested from emails
 * @token
 */
router.get('/user/reset-password/token/:token', (req,res) => {

    UserVerificationDao.checkToken(req.params.token, verificationTypes.PASSWORD_RESET)
        .then(verificationData => {
            if (verificationData) {
                res.status(200).json(new ApiResponse(200,"ok",verificationTypes.PASSWORD_RESET))
                // res.sendFile(__dirname+'/modules/live_tracking/client.html');
            }
            else res.status(401).json(new ApiResponse(401,'token invalidate or expired!'));
        }).catch(err => {
        let errCode = err.code || 500;
        res.status(errCode).json(new ApiResponse(errCode,err.message))
    });
});

/**
 * RESET PASSWORD REQUEST
 * @email
 */
router.post('/user/request-password-reset', (req, res) => {
    UserDao.findUserByEmail(req.body.email).then(user => {
        if(user){
            user = user.toJSON();
            delete user.password;

            let opt = otpUtils.generateOTP();

            let data = {
                subject: 'Houzes-Password Reset',
                token: opt,
                url: `http://${BaseUrls.dev}/api/v1/public/user/reset-password/token/${opt}`
            };

            mailer.sendPasswordResetEmail(user, data,(err, mailResp) => {
                if(err){res.status(err.code).send(err)}
                else{
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

router.post('/user/submitNewPassword', (req,res) => {
    let body = req.body;
    let token = body.token;
    let newPass = body.new_password;
    if(newPass === body.confirm_password){
        //@TODO
    }
});

module.exports = router;