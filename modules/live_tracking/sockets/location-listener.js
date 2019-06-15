const UserLocationDao = require('../../../db/dao/user-location-dao');
const authenticator = require('../middlewares/socket-authenticator').authenticateSocket;
module.exports = (io) => {

    io.use(authenticator).on('connection', function(socket){

        socket.on('walking::update_location', data => {
            UserLocationDao.saveOrUpdate(data).then(userLocation=>{
                io.emit('walking::location_update', userLocation);
            }).catch( err => {
                io.to(socket.id).emit('walking::location_update_err', err.message);
            });
            // io.to(socket.id).emit('walking::location_update', data);

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