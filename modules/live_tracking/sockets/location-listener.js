const UserLocationDao = require('../dao/UserLocationDao');
const authenticator = require('../middlewares/socket-middleware').authenticateSocket;
const saveOrUpdateUserSocket = require('../middlewares/socket-middleware').saveOrUpdateUserSocket;

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

        socket.on('location::update', data => {
            /**
             * set currentUser's id in data
             */
            data.user_id = socket.user_socket.user_id;

            UserLocationDao.saveOrUpdate(data).then(userLocation => {
                UserLocationDao.getNearbyUsersByRadius(userLocation.latitude,userLocation.longitude,1000)
                    .then(nearbySocketUsers=>{
                        if(nearbySocketUsers){
                            nearbySocketUsers.forEach(socketUser=>{
                                socketUser = socketUser.toJSON();
                                io.to(socketUser.socket_id).emit('location::after_update', userLocation);
                            });
                        }
                    });
                // io.emit('location::after_update', userLocation);
            }).catch(err => {
                io.to(socket.id).emit('location::error', err.message);
            });
        });

        // socket.on('disconnect', () => {
        //     if(socket.username){
        //         console.log(`${socket.username} disconnected`);
        //         socket.broadcast.emit('user left', socket.username);
        //     }

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

        // socket.on('disconnect', () => {
        //     if(socket.username){
        //         console.log(`${socket.username} disconnected`);
        //         socket.broadcast.emit('user left', socket.username);
        //     }
        //
        // });
    });
};