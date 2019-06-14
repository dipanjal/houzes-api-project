const express = require('express'),
	bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/oauth',require('./modules/oauth/oauth-controller'));
app.use('/api',require('./routers/api-router'));

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./modules/api_doc_generator/api-doc.json');
// app.use('/api/v1/doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// app.use(require('./modules/mailer'));


server.listen(port, () => {
	console.log(`listening: ${port}`);
});


/**
 * calling socket chatroom
 */
require('./modules/live_tracking/chatting')(io);

/**
 * serving html file
 * A Client for realtime chatting
 */
app.get('/',function(req, res){
	res.sendFile(__dirname+'/modules/live_tracking/chat-client.html');
});
