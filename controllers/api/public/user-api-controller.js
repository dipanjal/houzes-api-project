const router = require('express').Router();

let hashUtlis = require('../../../components/utils/hash-utils');
const UserDao = require('../../../db/dao/user-dao');
const validator = require('../../../middlewares/validator');
const ApiResponse = require('../../../components/view-models').ApiResponse;

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
        .then(user => res.json(new ApiResponse(200,'ok',user)))
        .catch(err => res.code(err.code||500).json(new ApiResponse(err.code||500,err.message)));
});

router.post('/reset-password', (req, res) => {
    UserDao.findUserByEmail(req.body.email).then(user=>{
        user = user.toJSON();
        delete user.password;

        let otpUtils = require('../../../components').utils.otpUtils;
        let otp = otpUtils.generateOTP();
        let data = {
            subject: 'Hello Testing!!',
            token: otp,
            url: `http://localhost:3000/api/v1/public/reset-password/token/${otp}`
        };

        let mailer = require('../../modules/mailer');
        mailer.sendPasswordResetEmail(user, data,(err, mailResp) => {
            if(err){res.send(err)}
            else{res.json(mailResp)}
        });
    }).catch(err => {
        let errCode = err.code||500;
        res.status(errCode).json(new ApiResponse(errCode,err.message));
    });
});

router.get('/reset-password/token/:token', (req, res) => {
    res.json({
        uuid:req.params.token,
        message: 'password reset successfully!!',
        code:200
    });
});

module.exports = router;