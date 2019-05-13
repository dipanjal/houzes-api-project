/**
 * base url: /api/auth
 * @type {Router}
 */

const router = require('express').Router();

let models = require('../../models');
let ApiResponse = models.ViewModels.ApiResponse;

const validationMiddleware = require('../../middlewares/validator');
const oAuthDao = require('../../modules/oauth/db/dao/oauth-dao');


/**
 * api endpoint: http://localhost:3000/api/auth/register/user
 */
router.get("/", (req,res) => {
    let data = [
        {
            "message": 'register oauth user',
            "method type": 'POST',
            "endpoint": 'http://localhost:3000/api/auth/register/user',
            "params": 'username, password'
        },
        {
            "message": 'register oauth client',
            "method type": 'POST',
            "endpoint": 'http://localhost:3000/api/auth/register/client',
            "params": 'username, password, client_name, client_id, client_secret'
        }
    ];
    res.json(new ApiResponse(200,'ok',data));
});

/**
 * api endpoint: http://localhost:3000/api/auth/register/user
 * register oAuth user
 */
router.post('/register/user', validationMiddleware.isUserExist,(req,res) => {
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
            // let errorMessage = err.errors[0].message
            res.send(err)
        }
        else{
            res.json(new ApiResponse(200,'ok',oAuthUser));
        }
        
    });
});

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

module.exports = router;