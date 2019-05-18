/**
 * base url: /api/public
 * @type {Router}
 */

const router = require('express').Router();

let viewModels = require('../../components/view-models');
let ApiResponse = viewModels.ApiResponse;

const oAuthDao = require('../../db/dao/oauth-dao');
const validationMiddleware = require('../../middlewares/validator');


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
router.post('/register/user', validationMiddleware.isUserExist, (req,res) => {
    let responseBody = req.body;
    let UserData = {
        email: responseBody.email,
        password: responseBody.password,
        first_name: responseBody.first_name,
        last_name: responseBody.last_name,
        scope: responseBody.scope == null ? 'default' : responseBody.scope
    };

    oAuthDao.saveOAuthUser(UserData, (err, oAuthUser) => {
        if (err){
            res.send(err)
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
router.post('/register/client', validationMiddleware.isOAUthClientExist,  (req,res) => {
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
    oAuthDao.findUserByEmail(req.body.email, (err,user)=>{
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
    });
});

router.get('/reset-password/token/:token', (req, res) => {
    res.json({ uuid:req.params.token,
            message: 'password reset successfully!!',
            code:200});
});

function getUUID(){
    let uuid = require('uuid4');
    return  uuid();
}


module.exports = router;