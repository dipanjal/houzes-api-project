
let oAuthDao = require('../db/dao/oauth-dao');
let UserDao = require('../db/dao/user-dao');
let ApiResponse = require('../components/view-models').ApiResponse;

let validator = function(){};

validator.isUserValid = (req,res, next) => {
	let body = req.body;
	if(!body.email){
		res.json('email is required!');
	}else if(!body.password){
		res.json('password is required!');
	}else if(!body.phone){
		res.json('phone is required!');
	}else if(!body.first_name){
		res.json('first name is required!');
	}else if(!body.last_name){
		res.json('last name is required!');
	}else{
		next();
	}
};

/**
 *	WHILE REGISTER USER
 *	CHECK IF USER ALREADY EXIST or NOT
 */
validator.isEmailExist = (req, res, next) => {
	// UserDao.findUserByEmail( req.body.email,(err, user) => {
	// 	if (user){
	// 		res.json(new ApiResponse(403,'email already existed, select an unique email'))
	// 	}else{
	// 		next();
	// 	}
	// });

	UserDao.findUserByEmail(req.body.email).then(user => {
		if(user) {res.json(new ApiResponse(403,'email already existed, select an unique email'))}
		else {next()}
	}).catch(err => res.send(err))
};

validator.isPhoneExist = (req, res, next) => {

};

validator.isOAuthClientValid = (req,res, next) => {
	let body = req.body;
	if(!body.email){
		res.json('user email is required!');
	}else if(!body.password){
		res.json('user password is required!');
	}else if(!body.client_name){
		res.json('client name is required!');
	}else if(!body.client_id){
		res.json('client id is required!');
	}else if(!body.client_secret){
		res.json('client secret is required!');
	}else{
		next();
	}
};

validator.isOAUthClientExist = (req,res, next) => {
	oAuthDao.findClientByClientId( req.body.client_id,(err, oAuthClient) => {
		if (err) {res.send(err);}
		else if (oAuthClient){
			let uuidUtils = require('../components').utils.uuidUtils;
			let uuid = uuidUtils.generateUUIDWithoutDash();
			let shortId = uuidUtils.generateShortUUID();
			res.json(new ApiResponse(403,'client id already in use',{suggested_client_id: shortId }));
		}else{
			next();
		}
	});
};

validator.isTempTokenExpired = (req,res,next) => {
	let config = require('../config');
	let tempTokenTimeTime = config.otpLifeTime;
	console.log(tempTokenTimeTime);
};

module.exports = validator;