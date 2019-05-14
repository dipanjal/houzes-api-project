/**
 * passing server instance from app.js to live_tracking module
 * @param server
 */


// const authenticator = require('../oauth/middleware/authenticator');
// const socketKey = "abcd1234";
// const socketAuth = require('socketio-auth');

module.exports = (server) => {
    const io = require('socket.io')(server);
    handleSocketStuffs(io);
};

function handleSocketStuffs(io){

    // io.use( (socket,next) => {
    //     console.log(socket);
    // });

    // socketAuth(io,{
    //     authenticate: function (socket, data, callback) {
    //         let access_token = data.access_token;
    //         console.log("token", access_token);
    //         return callback(null,true);
    //         // let password = data.password;
    //
    //         // db.findUser('User', {username:username}, function(err, user) {
    //         //     if (err || !user) return callback(new Error("User not found"));
    //         //     return callback(null, user.password === password);
    //         // });
    //     }
    // });

    io.on('connection',(socket) => {
        socket.on('authenticate user', (data) => {
            let userDao = require('../oauth/db/dao/oauth-dao');
            userDao.findUserByEmail(data.email, (err,user) => {
                if (err || !user) {
                    socket.emit('unauthenticated',{message: 'failed to authenticate'});
                    console.log('user failed to authenticate');
                }else{
                    socket.username = userEmail;
                    socket.emit('authenticated',{message: 'user authenticated'});
                    console.log('user authenticated');
                }
            });
        });

        socket.on
    });
}