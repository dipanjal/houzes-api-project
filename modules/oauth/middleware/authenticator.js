/**
 * @todo
 * load from factory
 */
const app = require('../app');
let oauth = app.oauth;
let Request = app.request;
let Response = app.response;


module.exports = function authenticateRequest(req, res, next) {
    console.log('authenticator()');
	let request = new Request(req);
	let response = new Response(res);

	return oauth.authenticate(request, response)
		.then(function(token) {
			next();
		}).catch(function(err) {
			res.status(err.code || 500).json(err);
		});
};