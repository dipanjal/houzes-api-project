const UserLocationDao = require('../dao/UserLocationDao'),
    UserSocketDao = require('../dao/UserSocketDao');
const authenticator = require('../middlewares/SocketMiddleware').authenticateSocket;
const saveOrUpdateUserSocket = require('../middlewares/SocketMiddleware').saveOrUpdateUserSocket;

module.exports = (io) => {

    /**
     * Authenticate socket connection by token
     * before create connection
     * from this token you will get current user
     */
    io.use(authenticator).use(saveOrUpdateUserSocket)
        .on('connection', socket=>{

        /**
         * Before production deployment
         * user currentUser to get user_id
         * don't receive user_id from client
         */
        // let currentUser = socket.access_token.user;

        let nearbyUsers = null;

            /**
             * while driving
             * Driver has emitted his location change to socket
             * to share with his nearby users/watchers
             */
        socket.on('location::share', locationData => {

            /**
             * to update driver's location in DB
             * set currentUser's id in LocationData
             */
            locationData.user_id = socket.user_socket.user_id;

            UserLocationDao.saveOrUpdate(locationData).then(userLocation => {

                /**
                 * after updating drivers location
                 * find his nearby users
                 */
                UserLocationDao.getNearbyUsersByRadius(userLocation.latitude,userLocation.longitude,1000)
                    .then(nearbySocketUsers=>{
                        if(nearbySocketUsers){
                            nearbyUsers = nearbySocketUsers;
                            /**
                             * server will emit 'location::receive' event
                             * to share driver's location
                             * to each nearby users individually
                             */
                            nearbySocketUsers.forEach(socketUser=>{
                                socketUser = socketUser.toJSON();
                                io.to(socketUser.socket_id).emit('location::receive', userLocation);
                            });
                        }
                    });
            }).catch(err => {
                io.to(socket.id).emit('location::error', err.message);
            });
        });

        socket.on('disconnect', () => {


            let currentUser = socket.access_token.user;
            let currentUserSocket = socket.user_socket;
            if(nearbyUsers){
                nearbyUsers.forEach(socketUser=>{
                    socketUser = socketUser.toJSON();
                    io.to(socketUser.socket_id).emit('user::disconnected', currentUser);
                });
            }
            console.log(currentUser.email,'disconnected from',currentUserSocket.socket_id);
            currentUserSocket.is_connected = false;
            UserSocketDao.update(currentUserSocket)
                .then(data => console.log(data))
                .catch(err=> console.log(err));
        });

        // socket.on('chat message', data => {
        //     let userName = data.username;
        //     let message = data.message;
        //     socket.username = userName;
        //     io.emit('chat message', userName+': '+message);
        // });

        // socket.on('new user', msg => {
        //     console.log(msg);
        // });


        // socket.on('authenticate user', (data) => {
        //     if (context.username === data.username){
        //         socket.username = data.username;
        //         console.log(data.username, 'authenticated');
        //         io.emit('authenticated', 'user authentication successful!!!');
        //     }else{
        //         console.log(data.username, 'authentication failed');
        //         io.emit('unauthenticated', 'failed to authentication!!!');
        //     }
        // });

        // socket.on('location change',(location) => {
        //     console.log(`location: ${location}`);
        // });
    });
};