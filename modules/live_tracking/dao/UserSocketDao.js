let UserSocketModel = require('../models').UserSocketModel;

module.exports.saveOrUpdate = (user_id,new_socket_id) => {
    return new Promise ((resolve, reject) => {
        /**
         * find UserSocket by user_id
         */
        UserSocketModel.findOne({
            where:{
                user_id : user_id
            }
        }).then(userSocket=>{
            /**
             * if UserSocket exist then ==> update UserSocket by id
             */
            if(userSocket){
                return userSocket.update({
                        socket_id: new_socket_id,
                        is_connected: true
                    },
                    {where: userSocket.id});
            }
            /**
             * else
             * create new UserSocket row
             * where is_connected = true by default
             */
            else{
                let userSocketData = {
                    user_id: user_id,
                    socket_id: new_socket_id
                };
                return UserSocketModel.create(userSocketData);
            }
        }).then(userSocketUpdated => {
            resolve(userSocketUpdated);
        }).catch(err => reject(err));
    });
};


module.exports.update = (currentUserSocket) => {
    // let userSocketToUpdate = UserSocketModel.build(currentUserSocket);
    let userSocketToUpdate = currentUserSocket;
    return new Promise((resolve, reject) => {
        userSocketToUpdate.update(currentUserSocket.toJSON()).then(userSocketUpdated=>{
            resolve(userSocketUpdated)
        }).catch(err=> reject(err));
    });

};