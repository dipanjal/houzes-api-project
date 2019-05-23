const router = require('express').Router();
const authenticator = require('../../modules/oauth/middleware/authenticator');
const ApiResponse = require('../../components').viewModels.ApiResponse;

router.get('/',authenticator,(req,res)=>{
    let data = {
        message: 'welcome to private zone :3'
    };
    res.json(new ApiResponse(200,'ok',data));
});

router.get('/allUsers',authenticator,(req,res)=>{
    let UserDao = require('../../db/dao/user-dao');
    UserDao.findAllUsers()
        .then(users => {
            res.json(new ApiResponse(200,'ok',users));
        }).catch(err => {
            res.json(new ApiResponse(500,'err',err));
        });
});


module.exports = router;