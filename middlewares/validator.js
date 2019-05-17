
let oAuthDao = require('../db/dao/oauth-dao');
let ApiResponse = require('../components/view-models').ApiResponse;

let validator = function(){};

/**
 *	WHILE REGISTER USER
 *	CHECK IF USER ALREADY EXIST or NOT
 */
validator.isUserExist = (req,res, next) => {
	oAuthDao.findUserByEmail( req.body.email,(err, user) => {
		if (user){
			res.json(new ApiResponse(403,'email already existed, select an unique email'))
		}else{
			next();
		}
	});
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
	let tempTokenTimeTime = config.tempTokenLifeTime;
	console.log(tempTokenTimeTime);
};

module.exports = validator;