/**
 * passing server instance from app.js to live_tracking module
 * @param server
 */

module.exports = (io) => {

    let context = {};
    context.username = 'user1';

    let rooms={};

    io.on('connection', function(socket){

        // socket.on('chat message', function(msg){
        //     io.emit('chat message', msg);
        // });

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



        socket.on('join request', data => {
            // let roomName = data.roomName;

            // if(rooms[roomName]){
            //     rooms[roomName].push(socket);
            // }else{
            //     rooms[roomName] = [socket];
            // }

            socket.join(data.roomName);
            io.to(socket.id).emit('me joined', data);
            socket.broadcast.to(data.roomName).emit('new user',data);

            // io.to(roomName).emit('new user',{
            //     roomName:roomName,
            //     username:data.username
            // });

        });

        socket.on('room chatting', data=> {
            io.to(data.roomName).emit('room message',data);
        });

        socket.on('leave request', data => {
            // socket.leave(data.roomName);
            io.to(socket.id).emit('me left',data);
            socket.broadcast.to(data.roomName).emit('left user',data);
        });

    });
};