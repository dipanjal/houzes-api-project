const express = require('express'),
	bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

server.listen(port, () => {
	console.log(`listening: ${port}`);
});

const liveTracking = require('./modules/live_tracking')(server);

app.get('/',function(req, res){
	res.sendFile(__dirname+'/modules/live_tracking/client.html');
});



app.use('/oauth',require('./modules/oauth/oauth-controller'));
app.use('/api',require('./routers/api-router'));



