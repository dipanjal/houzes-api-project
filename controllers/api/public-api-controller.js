/**
 * base url: /api/v1/public
 * @type {Router}
 */

const router = require('express').Router();

let viewModels = require('../../components/view-models');
let ApiResponse = viewModels.ApiResponse;

const oAuthDao = require('../../db/dao/oauth-dao');


const validator = require('../../middlewares/validator');


/**
 * api endpoint: http://localhost:3000/api/public/register/user
 */
router.get("/", (req,res) => {
    let data = [
        {
            "message": 'register oauth user',
            "method type": 'POST',
            "endpoint": 'http://localhost:3000/api/public/register/user',
            "params": 'email, password, first_name, last_name'
        },
        {
            "message": 'register oauth client',
            "method type": 'POST',
            "endpoint": 'http://localhost:3000/api/public/register/client',
            "params": 'email, password, client_name, client_id, client_secret'
        }
    ];
    res.json(new ApiResponse(200,'ok',data));
});

/**
 * REGISTER oAUTH USER
 * api endpoint: http://localhost:3000/api/public/register/user
 * params: email, password, first_name, last_name
 */
router.post('/register/user', validator.isUserValid,validator.isUserExist,(req,res) => {
    let body = req.body;
    let UserData = {
        email: body.email,
        password: body.password,
        first_name: body.first_name,
        last_name: body.last_name,
        scope: body.scope == null ? 'default' : body.scope
    };

    oAuthDao.saveOAuthUser(UserData, (err, oAuthUser) => {
        if (err){
            res.json(err.message)
        }
        else{
            res.json(new ApiResponse(200,'ok',oAuthUser));
        }
        
    });
});

router.get('/confirm/user/token/:token', (req,res) => {

});

/**
 * REGISTER OAUTH CLIENT
 * api endpoint: http://localhost:3000/api/public/register/client
 * params: email, password, client_name, client_id, client_secret
 */
router.post('/register/client', validator.isOAUthClientExist,  (req,res) => {
    let responseBody = req.body;
    let UserData = {
        email: responseBody.email,
        password: responseBody.password,
        first_name: responseBody.first_name,
        last_name: responseBody.last_name
    };
    let OAuthClientData = {
        client_name: responseBody.client_name,
        client_id: responseBody.client_id,
        client_secret: responseBody.client_secret,
    };

    /**
     * Using Promise
     */
    oAuthDao.saveOAuthClient(UserData,OAuthClientData)
        .then(response => res.json(response))
        .catch(error => res.send(error))

    // oAuthDao.saveOAuthClient(UserData,OAuthClientData,(err,oAuthClient)=>{
    //     if (err) {res.send(err)}
    //     else{res.json(oAuthClient)}
    // });
});


router.post('/reset-password', (req, res) => {
    /*oAuthDao.findUserByEmail(req.body.email, (err,user)=>{
        if(err){res.send(err)}
        else{
            user = user.toJSON();
            delete user.password;

            let uuidUtils = require('../../components').utils.uuidUtils;
            let uuid = uuidUtils.generateUUIDWithoutDash();
            let data = {
                subject: 'Hello Testing!!',
                token: uuid,
                url: `http://localhost:3000/api/v1/public/reset-password/token/${uuid}`
            };

            let mailer = require('../../modules/mailer');
            mailer.sendPasswordResetEmail(user, data,(err, mailResp) => {
                if(err){res.send(err)}
                else{res.json(mailResp)}
            });
        }
    });*/

    oAuthDao.findUserByEmail(req.body.email)
        .then(user => {
        user = user.toJSON();
        delete user.password;

        // let uuidUtils = require('../../components').utils.uuidUtils;
        // let uuid = uuidUtils.generateUUIDWithoutDash();

        let components = require('../../components');
        let OTPUtils = components.utils.otpUtils;
        let VerificationTypesEnum = components.enums.VerificationTypesEnum;
        let code = OTPUtils.generateOTP();
        let otpLifeTime = OTPUtils.getOTPLifeTime();
        let dataToSave = {
            code:code,
            expired_at:otpLifeTime,
            user_email:req.body.email,
            verification_type: VerificationTypesEnum.PASSWORD_RESET
        };

        let  VerificationCodeDao = require('../../db/dao/verification-code-dao');
        VerificationCodeDao.save(dataToSave)
            .then(verificationCodeObj => {
                let emailData = {
                    subject: 'Hello Testing!!',
                    token: code,
                    url: `http://localhost:3000/api/v1/public/reset-password/token/${code}`
                };

                // let mailer = require('../../modules/mailer');
                // mailer.sendPasswordResetEmail(user, emailData,(err, mailResp) => {
                //     if(err){res.send(err)}
                //     else{
                //         res.json(dataToSave);
                //     }
                // });

                res.json(dataToSave);
            })
            .catch(err => {
                res.send(err)
            });

    }).catch(err => res.send(err));
});

router.post('/reset-password/verifyToken',validator.velidateTempToken, (req, res) => {
    res.json({ otp:req.params.token,
            message: 'password reset successfully!!',
            code:200});
});

router.get('/reset-password/token/:token', (req, res) => {
    res.json({ otp:req.params.token,
        message: 'password reset successfully!!',
        code:200});
});


router.get('/otp', (req,res) => {
    let OTPUtils = require('../../components').utils.otpUtils;
    let VerificationTypesEnum = enums.VerificationTypesEnum;
    let code = OTPUtils.generateOTP();
    let otpLifeTime = OTPUtils.getOTPLifeTime();
    let data = {
        code:code,
        expired_at:otpLifeTime,
        user_email:req.body.email,
        verification_type: VerificationTypesEnum.PASSWORD_RESET
    };
    res.json(data);

    // oAuthDao.findUserByEmail(req.body.email).then(user=>{
    //
    // }).catch(err => res.send(err));
    // res.json({data: OTPUtils.generateOTP() });

});


module.exports = router;