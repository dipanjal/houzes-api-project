/**
 * base url: /api/auth
 * @type {Router}
 */

const router = require('express').Router();

let models = require('../../models');
let ApiResponse = models.ViewModels.ApiResponse;

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
            "params": 'username, client_name, client_id, client_secret'
        }
    ];
    res.json(new ApiResponse(200,'ok',data));
});

/**
 * api endpoint: http://localhost:3000/api/auth/register/user
 * register oAuth user
 */
router.post('/register/user',(req,res) => {
    let responseBody = req.body;
    let UserData = {
        username: responseBody.username,
        password: responseBody.password,
        scope: responseBody.scope == null ? 'default' : responseBody.scope
    };

    oAuthDao.saveOAuthUser(UserData, (err, oAuthUser) => {
        if (err){res.send(err)}
        res.json(new ApiResponse(200,'ok',oAuthUser.toJSON()));
    });
});

router.post('/register/client', (req,res) => {
    let responseBody = req.body;
    let UserData = {
        "username": responseBody.username,
        "password": responseBody.password
    };
    let OAuthClientData = {
        "client_name": responseBody.client_name,
        "client_id": responseBody.client_id,
        "client_secret": responseBody.client_secret,
    };
    oAuthDao.saveOAuthClient(UserData,OAuthClientData,(err,oAuthClient)=>{
        if (err) {res.send(err)}
        res.json(oAuthClient);
    });

});

module.exports = router;