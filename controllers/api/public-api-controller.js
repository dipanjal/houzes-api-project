/**
 * base url: /api/public
 * @type {Router}
 */

const router = require('express').Router();

let models = require('../../models');
let ApiResponse = models.ViewModels.ApiResponse;

const validationMiddleware = require('../../middlewares/validator');
const oAuthDao = require('../../modules/oauth/db/dao/oauth-dao');


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

/**
 * REGISTER OAUTH CLIENT
 * api endpoint: http://localhost:3000/api/public/register/client
 * params: email, password, client_name, client_id, client_secret
 */
router.post('/register/client', (req,res) => {
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
    oAuthDao.saveOAuthClient(UserData,OAuthClientData,(err,oAuthClient)=>{
        if (err) {res.send(err)}
        else{
            res.json(oAuthClient);
        }
    });
});

router.post('/reset-password/', (req, res) => {
    oAuthDao.findUserByEmail(req.body.email, (err,user)=>{
        if(err){res.send(err)}
        else{
            user = user.toJSON();
            delete user.password;
            res.json(user);
        }
    });
});

router.get('/reset-password/:token', (req, res) => {
    res.json({ uuid:req.params.token});
});

router.get('/send-email',(req,res)=>{
    let mailer = require('../../modules/mailer/mailer');
    mailer.sendEmail();
    res.send('djlajsdld')
});

module.exports = router;