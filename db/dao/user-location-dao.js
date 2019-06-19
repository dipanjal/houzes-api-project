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

        let queryString = 'SELECT oauth_users.email, user_locations.* FROM user_locations \n' +
            'INNER JOIN oauth_users ON user_locations.user_id = oauth_users.id\n' +
            'WHERE ST_Distance_Sphere(ST_MakePoint(latitude,longitude), ST_MakePoint(:lat,:lon)) <= :radius';

        sequelize.query(queryString,{
                model: UserLocationModel,
                mapToModel: true, // pass true here if you have any mapped fields
                replacements: {
                    lat: latitude,
                    lon: longitude,
                    radius:radius
                }
            })
            .then(userLocations => {
                resolve(userLocations);
            }).catch(err=>reject(err));
    });
};

module.exports = UserLocationDao;