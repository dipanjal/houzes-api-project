
let oAuthDao = require('../db/dao/oauth-dao');
let VerificationCodeDao = require('../db/dao/verification-code-dao');
let ApiResponse = require('../components/view-models').ApiResponse;

let validator = function(){};

validator.isUserValid = (req,res, next) => {
	let body = req.body;
	if(!body.email){
		res.json('email is required!');
	}else if(!body.password){
		res.json('password is required!');
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
validator.isUserExist = (req,res, next) => {
	// oAuthDao.findUserByEmail( req.body.email,(err, user) => {
	// 	if (user){
	// 		res.json(new ApiResponse(403,'email already existed, select an unique email'))
	// 	}else{
	// 		next();
	// 	}
	// });

	oAuthDao.findUserByEmail(req.body.email).then(user=>{
		next()
	}).catch( err => {
		res.send(err)
	});
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

validator.velidateTempToken = (req, res, next) => {
	VerificationCodeDao.validateToken(req.body.code,req.body.email)
		.then(verificationCode => {
			if(verificationCode){
				next();
			}else{
				res.send('code expired, request a new one');
			}
		})
		.catch(err => res.send(err));
};

module.exports = validator;