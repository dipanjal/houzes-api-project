
const app = require('../app');
let oauth = app.oauth,
	Request = app.request,
	Response = app.response,
	ApiResponse = require('../../../components/view-models').ApiResponse;

let UserDao = require('../../../db/dao/user-dao');
module.exports.authenticateRequest = function (req, res, next) {
    console.log('authenticator()');
	let request = new Request(req);
	let response = new Response(res);

	return oauth.authenticate(request, response)
		.then( token => {
			// next();
			if(token){
				return UserDao.findActivatedUserByEmail(token.user.email);
			}
		}).then(user=>{
			if(user) next();
			else res.status(401).json(new ApiResponse(401,'please verify your account'));
		}).catch(err => {
			res.status(err.code || 500).json(err);
		});
};


