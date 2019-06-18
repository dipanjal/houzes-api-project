const router = require('express').Router();
const authenticator = require('../../../modules/oauth/middleware/authenticator').authenticateRequest;
const ApiResponse = require('../../../components').viewModels.ApiResponse;
const UserLocationDao = require('../../../db/dao/user-location-dao');

router.get('/user-location',authenticator,(req,res)=>{
    let data = {
        message: 'accessed to user location'
    };
    res.json(new ApiResponse(200,'ok',data));
});


router.put('/user-location',authenticator,(req,res)=>{
    let requestBody = req.body;
    let data = {
        user_id: requestBody.user_id,
        latitude: requestBody.latitude,
        longitude: requestBody.longitude,
        is_driving:requestBody.is_driving?requestBody.is_driving:false
    };
    UserLocationDao.saveOrUpdate(data).then(userLocation=>{
        res.json(new ApiResponse(200,'ok',userLocation));
    }).catch( err => {
        res.status(500).send(err.message);
    });
});

router.post('/user-nearby',authenticator,(req,res)=> {
    UserLocationDao.getNearbyUsersByRadius(req.body.latitude,req.body.longitude,req.body.radius)
        .then(locations => {
            res.json(new ApiResponse(200,'ok',locations));
        }).catch(err => {
            res.status(err.code||500).json(err.message);
        });
});



module.exports = router;