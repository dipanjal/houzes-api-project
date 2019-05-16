const express = require('express'),
	bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/',function(req, res){
	res.sendFile(__dirname+'/modules/live_tracking/client.html');
});

app.use('/oauth',require('./modules/oauth/oauth-controller'));
app.use('/api',require('./routers/api-router'));


server.listen(port, () => {
	console.log(`listening: ${port}`);
});

/**
 * calling socket
 */
let liveTracking = require('./modules/live_tracking')(io);

/**
 * SOCKET STARTS HERE
 */



// context = {};
// context.username = 'user1';
// io.on('connection', function(socket){
// 	socket.on('chat message', function(msg){
// 		io.emit('chat message', msg);
// 	});
//
// 	socket.on('authenticate user', (data) => {
// 		if (context.username === data.username){
// 			socket.username = data.username;
// 			io.emit('authenticated', 'user authentication successful!!!');
// 		}else{
// 			io.emit('unauthenticated', 'failed to authentication!!!');
// 		}
// 	});
//
// 	socket.on('disconnect', () => {
// 		console.log(`${socket.username} disconnected`);
// 	});
// });


