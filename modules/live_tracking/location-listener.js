const UserLocationDao = require('../../../db/dao/user-location-dao');

module.exports = (io) => {

    io.on('connection', function(socket){

        socket.on('update location', data => {
            UserLocationDao.saveOrUpdate(data).then(userLocation=>{
                // res.json(new ApiResponse(200,'ok',userLocation));
            }).catch( err => {
                data = err;
                // res.status(500).send(err.message);
            });
            io.emit('location updated', data);
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