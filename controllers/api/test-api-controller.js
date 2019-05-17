const router = require('express').Router();
const authenticator = require('../../modules/oauth/middleware/authenticator');

router.get('/',authenticator,(req,res)=>{
    let data = {
        message: 'welcome to private zone :3'
    };
    res.json(data);
});

router.get('/all_tokens',authenticator,(req,res)=>{
    let oAuthDao = require('../../commons/dao/oauth-dao');
    oAuthDao.findAllAccessTokens((err,oAuthAccessTokens) => {
        if(err) res.send(err);
        res.json(oAuthAccessTokens);
    });
});


module.exports = router;