/**
 * passing server instance from app.js to live_tracking module
 * @param server
 */

module.exports = (io) => {

    let context = {};
    context.username = 'user1';
    io.on('connection', function(socket){
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });

        socket.on('authenticate user', (data) => {
            if (context.username === data.username){
                socket.username = data.username;
                console.log(data.username, 'authenticated');
                io.emit('authenticated', 'user authentication successful!!!');
            }else{
                console.log(data.username, 'authentication failed');
                io.emit('unauthenticated', 'failed to authentication!!!');
            }
        });

        socket.on('location change',(location) => {
            console.log(`location: ${location}`);
        });

        socket.on('disconnect', () => {
            console.log(`${socket.username} disconnected`);
        });
    });
};