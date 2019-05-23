/**
 * base url: /api/v1/public
 * @type {Router}
 */

const router = require('express').Router();

router.use(require('./public/user-api-controller'));
router.use(require('./public/auth-api-controller'));


// const oAuthDao = require('../../db/dao/oauth-dao');
// const UserDao = require('../../db/dao/user-dao');
// const validator = require('../../middlewares/validator');

// let isUserValid = validator.isUserValid;
// let isEmailExist = validator.isEmailExist;
// let isPhoneExist = validator.isPhoneExist;

/**
 * api endpoint: http://localhost:3000/api/public/register/user
 */
// router.get("/", (req,res) => {
//     let data = [
//         {
//             "message": 'register oauth user',
//             "method type": 'POST',
//             "endpoint": 'http://localhost:3000/api/public/register/user',
//             "params": 'email, password, first_name, last_name'
//         },
//         {
//             "message": 'register oauth client',
//             "method type": 'POST',
//             "endpoint": 'http://localhost:3000/api/public/register/client',
//             "params": 'email, password, client_name, client_id, client_secret'
//         }
//     ];
//     res.json(new ApiResponse(200,'ok',data));
// });


// router.post('/user/register', isUserValid,isEmailExist,isPhoneExist,(req, res) => {
//     let hashUtlis = require('../../components/utils/hash-utils');
//     let body = req.body;
//     let UserData = {
//         email: body.email,
//         password: hashUtlis.generateMD5Hash(body.password),
//         first_name: body.first_name,
//         last_name: body.last_name,
//         phone:body.phone,
//         scope: body.scope == null ? 'default' : body.scope
//     };
//     UserDao.saveOAuthUser(UserData)
//         .then(user => res.json(new ApiResponse(200,'ok',user)))
//         .catch(err => res.json(new ApiResponse(500,'error',err)))
// });

// router.get('/confirm/user/token/:token', (req,res) => {
//
// });

/**
 * REGISTER OAUTH CLIENT
 * api endpoint: http://localhost:3000/api/public/register/client
 * params: email, password, client_name, client_id, client_secret
 */
// router.post('/client/register', validator.isOAUthClientExist,  (req,res) => {
//     let responseBody = req.body;
//     let UserData = {
//         email: responseBody.email,
//         password: responseBody.password
//     };
//     let OAuthClientData = {
//         client_name: responseBody.client_name,
//         client_id: responseBody.client_id,
//         client_secret: responseBody.client_secret,
//     };
//
//     /**
//      * Using Promise
//      */
//     oAuthDao.saveOAuthClient(UserData,OAuthClientData)
//         .then(response => res.json(response))
//         .catch(error => res.send(error))
// });

// router.post('/reset-password', (req, res) => {
//     oAuthDao.findUserByEmail(req.body.email, (err,user)=>{
//         if(err){res.send(err)}
//         else{
//             user = user.toJSON();
//             delete user.password;
//
//             let uuidUtils = require('../../components').utils.uuidUtils;
//             let uuid = uuidUtils.generateUUIDWithoutDash();
//             let data = {
//                 subject: 'Hello Testing!!',
//                 token: uuid,
//                 url: `http://localhost:3000/api/v1/public/reset-password/token/${uuid}`
//             };
//
//             let mailer = require('../../modules/mailer');
//             mailer.sendPasswordResetEmail(user, data,(err, mailResp) => {
//                 if(err){res.send(err)}
//                 else{res.json(mailResp)}
//             });
//         }
//     });
// });





module.exports = router;