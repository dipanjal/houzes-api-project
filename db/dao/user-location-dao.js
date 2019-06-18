const sequelize = require('../connectors/seq-pg-connector');
let UserLocationModel = require('../../db/models').UserLocationModel;
let UserLocationDao = function () {};

/**
 *  SAVE or UPDATE
 **/

UserLocationDao.saveOrUpdate = (UserLocationData) => {
    return new Promise((resolve, reject) => {
        UserLocationModel.findOne({
            where:{user_id:UserLocationData.user_id},
        }).then(userLocation => {
            if(userLocation){
                return userLocation.update(
                    UserLocationData,
                    {where: userLocation.id});
            }else{
                return UserLocationModel.create(UserLocationData)
            }
        }).then( obj => {
            resolve(obj)
        }).catch(err => reject(err));
    });
};


UserLocationDao.getNearbyUsersByRadius = (latitude,longitude,radius) => {
    return new Promise((resolve,reject) => {

        let queryString = 'SELECT * FROM user_locations ' +
            'WHERE ST_Distance_Sphere(ST_MakePoint(latitude,longitude), ' +
            'ST_MakePoint('+latitude+','+longitude+')) <= '+radius;

        sequelize.query(queryString,{
                model: UserLocationModel,
                mapToModel: true // pass true here if you have any mapped fields
            })
            .then(userLocations => {
                resolve(userLocations);
            }).catch(err=>reject(err));
    });
};

module.exports = UserLocationDao;