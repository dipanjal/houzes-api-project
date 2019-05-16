
let oAuthDao = require('../modules/oauth/db/dao/oauth-dao');
let ApiStatus = require('../models').ViewModels.ApiResponse;

let validator = function(){};

/**
 *	WHILE REGISTER USER
 *	CHECK IF USER ALREADY EXIST or NOT
 */
validator.isUserExist = (req,res, next) => {
	oAuthDao.findUserByEmail( req.body.email,(err, user) => {
		if (user){
			res.json(new ApiStatus(403,'email already existed, select an unique email'))
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