let oAuthDao = require('../db/dao/oauth-dao'),
	UserDao = require('../db/dao/user-dao'),
	ApiResponse = require('../components/view-models').ApiResponse,
	UserStatusEnum = require('../components/enums/user-status-types-enum');

let userValidator = function(){};

userValidator.isUserValid = (req, res, next) => {
	let body = req.body;
	let isValid = false;
	let message;
	if(!body.email){
		message = 'email is required!';
	}else if(!body.password){
		message = 'password is required!!';
	}else if(!body.phone){
		message = 'phone is required!';
	}else if(!body.first_name){
		message = 'first name is required!';
	}else if(!body.last_name){
		message = 'last name is required!';
	}else{
		isValid = true;
		next();
	}
	if(!isValid){
		res.status(400)
			.json(new ApiResponse(400,'missing require fields',message));
	}
};

/**
 *	WHILE REGISTER USER
 *	CHECK IF USER ALREADY EXIST or NOT
 */
userValidator.isEmailExist = (req, res, next) => {
	UserDao.findUserByEmail(req.body.email).then(user => {
		if(user) res.status(403).json(new ApiResponse(403,'email already existed, select an unique email'));
		else next();
	}).catch(err => res.code(500).json(new ApiResponse(500,'ok',err)))
};

userValidator.isPhoneExist = (req, res, next) => {
	UserDao.findUserByPhone(req.body.phone).then(user => {
			if (user) res.status(403).json(new ApiResponse(403,'phone already existed, select an unique phone'));
			else next();
		})
		.catch(err=> res.code(500).json(new ApiResponse(500,'ok',err)) );
};

userValidator.isOAuthClientValid = (req, res, next) => {
	let body = req.body;
	let isValid = false;
	let message;
	if(!body.email){
		message = 'user email is required!';
	}else if(!body.password){
		message = 'user password is required!';
	}else if(!body.client_name){
		message = 'client name is required!';
	}else if(!body.client_id){
		message = 'client id is required!';
	}else if(!body.client_secret){
		message = 'client secret is required!';
	}else{
		isValid = true;
		next();
	}
	if(!isValid){
		res.status(400).send(new ApiResponse(400,'missing required fields',message));
	}
};

userValidator.isOAUthClientExist = (req, res, next) => {
	oAuthDao.findClientByClientId( req.body.client_id,(err, oAuthClient) => {
		if (err) {res.send(err);}
		else if (oAuthClient){
			let uuidUtils = require('../components').utils.uuidUtils;
			// let uuid = uuidUtils.generateUUIDWithoutDash();
			let shortId = uuidUtils.generateShortUUID();
			res.json(new ApiResponse(403,'client id already in use',{suggested_client_id: shortId }));
		}else{
			next();
		}
	});
};

userValidator.isUserActivated = (req,res,next) => {
	// let whereCondition = {
	// 		email:req.body.email,
	// 		status:UserStatusEnum.ACTIVATED
	// };
	UserDao.findActivatedUserByEmail(req.body.email).then( user => {
		if(user) next();
		else res.status(401).json(new ApiResponse(401,'please verify you account'));
	}).catch(err => res.status(err.code||500).json(new ApiResponse(err.code||500,err.message,err)));
};

// userValidator.isTempTokenExpired = (req, res, next) => {
// 	let config = require('../config');
// 	let tempTokenTimeTime = config.otpLifeTime;
// 	console.log(tempTokenTimeTime);
// };

module.exports = userValidator;