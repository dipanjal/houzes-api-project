const router = require('express').Router();
let ApiResponse = require('../../../components/view-models').ApiResponse;
const isOAUthClientExist = require('../../../middlewares/user-validator').isOAUthClientExist;
const oAuthDao = require('../../../db/dao/oauth-dao');

/**
 * REGISTER OAUTH CLIENT
 * api endpoint: http://localhost:3000/api/public/register/client
 * params: email, password, client_name, client_id, client_secret
 */
router.post('/client/register', isOAUthClientExist,  (req,res) => {
    let responseBody = req.body;
    let UserData = {
        email: responseBody.email,
        password: responseBody.password
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
        .then(response => res.json(new ApiResponse(200,'Client Created Successfully!',response)))
        .catch(error => res.code(500).json(new ApiResponse(500,error.message,error)));
});

module.exports = router;