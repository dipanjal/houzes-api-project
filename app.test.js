var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
var path = require('path');

const context = this;
// var emoji = require('node-emoji')

//to post json form body
app.use(express.json());

// for static files
app.use(express.static(path.join(__dirname, 'views')));

//server will listen to this port
http.listen(port, function(){
    console.log('listening on --> ' + port);
});

app.get('/',function(req, res){
    res.sendFile(__dirname+'/modules/live_tracking/client.html');
});

context.username = 'user1';
io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        // console.log('client:',msg);
        io.emit('chat message', msg);
    });

    socket.on('authenticate user', (data) => {
       console.log(data);
       if (context.username == data.username){
           io.emit('authenticated', 'user authentication successful!!!');
       }else{
           io.emit('unauthenticated', 'failed to authentication!!!');
       }
    });
});

