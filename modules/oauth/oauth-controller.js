const router = require('express').Router();
const isUserActivated = require('../../middlewares/user-validator').isUserActivated;
/**
 * @todo
 * load form factory
 */

// const factory = require('./factory');

let app = require('./app');
let oauth = app.oauth;
let Request = app.request;
let Response = app.response;

let ApiResponse = require('../../components/view-models').ApiResponse;

/** GET AUTH TOKEN /oauth/token */
router.all('/token',isUserActivated, obtainToken);
router.all('/token/refresh', obtainToken);
router.all('/token/revoke', obtainToken);

function obtainToken(req, res) {

	if(req.body.email){req.body.username = req.body.email;}

	let request = new Request(req);
	let response = new Response(res);
	console.log('obtainToken()');
	return oauth.token(request, response)
		.then(function(token) {
			delete token.user.password;
            delete token.accessToken;
            delete token.refreshToken;
			res.json(new ApiResponse(200,'ok',token));
		}).catch(function(err) {
			let code = err.code || 500;
			res.status(code).json(new ApiResponse(code,err.message,err));
		});
}

module.exports = router;