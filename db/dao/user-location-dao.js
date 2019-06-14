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

module.exports = UserLocationDao;