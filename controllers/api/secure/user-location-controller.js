/**
 * url: /api/v1/location
 * @type {Router}
 */

const router = require('express').Router();
const authenticator = require('../../../modules/oauth/middleware/authenticator').authenticateRequest;
const ApiResponse = require('../../../components').viewModels.ApiResponse;
const UserLocationDao = require('../../../db/dao/user-location-dao');

/**
 * save or update user's location
 */
router.put('/update',authenticator,(req,res)=>{
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

/**
 * get nearby users within a radius
 */
router.post('/nearby',authenticator,(req,res)=> {
    UserLocationDao.getNearbyUsersByRadius(req.body.latitude,req.body.longitude,req.body.radius)
        .then(locations => {
            res.json(new ApiResponse(200,'ok',locations));
        }).catch(err => {
            res.status(err.code||500).json(err.message);
        });
});



module.exports = router;