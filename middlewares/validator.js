
let oAuthDao = require('../modules/oauth/db/dao/oauth-dao');
let ApiStatus = require('../models').ViewModels.ApiResponse;

let validator = function(){};
validator.isUserExist = (req,res, next) => {
	oAuthDao.findByEmail( req.body.email,(err,user) => {
		if (user){
			res.json(new ApiStatus(403,'email already existed, select an unique email'))
		}else{
			next();
		}
	});
};

module.exports = validator;