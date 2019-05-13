const express = require('express'),
	bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/oauth',require('./modules/oauth/oauth-controller'));
app.use('/api',require('./routers/api-router'));



app.listen(3000, () => { 
	console.log("listening:", 3000)
});