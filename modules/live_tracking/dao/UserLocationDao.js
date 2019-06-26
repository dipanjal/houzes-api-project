const sequelize = require('./PG-DBConnector');
let UserLocationModel = require('../models').UserLocationModel;
let UserLocationDao = function () {};

/**
 * SAVE OR UPDATE
 * @param UserLocationData
 * @returns {Promise<any>}
 */

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

/**
 * SERVER NEARBY USERS IN SPECIFIC RADIUS
 * @param latitude
 * @param longitude
 * @param radius
 * @returns {Promise<any>}
 */
UserLocationDao.getNearbyUsersByRadius = (latitude,longitude,radius) => {
    return new Promise((resolve,reject) => {

        let queryString = 'SELECT oauth_users.email, user_locations.*, user_sockets.socket_id FROM user_locations \n' +
            'INNER JOIN user_sockets ON user_locations.user_id = user_sockets.user_id\n' +
            'INNER JOIN oauth_users ON user_locations.user_id = oauth_users.id\n' +
            'WHERE ST_DistanceSphere(ST_MakePoint(latitude,longitude), ST_MakePoint(:lat,:lon)) <= :radius';

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