let User = require('../../modules/oauth/auth_models').User;

let UserVerificationModel = require('./user-verification-model');
let UserLocationModel = require('./user-location-model');

UserVerificationModel.belongsTo(User,{foreignKey: 'user_id'});
UserLocationModel.belongsTo(User,{foreignKey: 'user_id'});

module.exports = {
    UserVerificationModel,
    UserLocationModel
    // UserVerificationModel:require('./user-verification-model'),
    // UserVerificationModel:require('./user-location-model')
};