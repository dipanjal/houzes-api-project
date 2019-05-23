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
        .catch(err => res.json(new ApiResponse(500,'error',err)))
});

module.exports = router;