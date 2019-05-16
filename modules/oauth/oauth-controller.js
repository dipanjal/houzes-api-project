const router = require('express').Router();
/**
 * @todo
 * load form factory
 */

// const factory = require('./factory');

let app = require('./app');
let oauth = app.oauth;
let Request = app.request;
let Response = app.response;

/** GET AUTH TOKEN /oauth/token */
router.all('/token', obtainToken);
router.all('/revoke', obtainToken);

function obtainToken(req, res) {

	if(req.body.email){req.body.username = req.body.email;}

	let request = new Request(req);
	let response = new Response(res);
	console.log('obtainToken()');
	return oauth.token(request, response)
		.then(function(token) {
            delete token.accessToken;
            delete token.refreshToken;
			// console.log(token);
			res.json(token);
		}).catch(function(err) {
			res.status(err.code || 500).json(err);
		});
}



module.exports = router;