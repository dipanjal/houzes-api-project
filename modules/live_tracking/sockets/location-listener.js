const UserLocationDao = require('../../../db/dao/user-location-dao');
const authenticator = require('../middlewares/socket-authenticator').authenticateSocket;
const validateUserLocation = require('../schemas/UserLocationSchema').validateUserLocation;

module.exports = (io) => {

    /**
     * Authenticate socket connection by token
     * before create connection
     * from this token you will get current user
     */
    io.use(authenticator).on('connection', function(socket){
        /**
         * Before production deployment
         * user currentUser to get user_id
         * don't receive user_id from client
         */
        // let currentUser = socket.access_token.user;

        socket.on('walking::update_location', data => {
            /**
             * set currentUser's id in data
             */
            // data.user_id = currentUser.id;

            UserLocationDao.saveOrUpdate(data).then(userLocation => {
                io.emit('walking::location_update', userLocation);
            }).catch(err => {
                io.to(socket.id).emit('walking::location_update_err', err.message);
            });
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

        // socket.on('disconnect', () => {
        //     if(socket.username){
        //         console.log(`${socket.username} disconnected`);
        //         socket.broadcast.emit('user left', socket.username);
        //     }
        //
        // });
    });
};