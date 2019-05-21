const router = require('express').Router();
const authenticator = require('../../modules/oauth/middleware/authenticator');
const ApiResponse = require('../../components').viewModels.ApiResponse;

router.get('/',authenticator,(req,res)=>{
    let data = {
        message: 'welcome to private zone :3'
    };
    res.json(data);
});

router.get('/allUsers',authenticator,(req,res)=>{
    // let oAuthDao = require('../../db/dao/oauth-dao');
    let UserDao = require('../../db/dao/user-dao');
    // UserDao.findAllUsers((err,Users) => {
    //     if(err) res.send(err);
    //     else res.json(Users);
    // });

    UserDao.findAllUsers()
        .then(users => {
            if(users) {
                res.json(new ApiResponse(200,'ok',users));
            }else{
                res.json(new ApiResponse(400,'no user found'));
            }
        }).catch(err => {
            res.send(err);
        });
});


module.exports = router;