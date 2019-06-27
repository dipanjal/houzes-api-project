/**
 * passing server instance from app.js to live_tracking module
 * @param server
 */

module.exports = (io) => {
    io.on('connection', function(socket){

        socket.on('join request', data => {

            socket.join(data.roomName);
            io.to(socket.id).emit('me joined', data);
            socket.broadcast.to(data.roomName).emit('new user',data);

            // io.to(data.roomName).emit('new user',data);

        });

        socket.on('room chatting', data=> {
            io.to(data.roomName).emit('room message',data);
        });

        socket.on('leave request', data => {
            socket.leave(data.roomName);
            io.to(socket.id).emit('me left',data);
            socket.broadcast.to(data.roomName).emit('left user',data);
        });

    });
};