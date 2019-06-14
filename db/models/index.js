let User = require('../../modules/oauth/auth_models').User;

let UserVerificationModel = require('./UserVerificationModel');
let UserLocationModel = require('./UserLocationModel');

UserVerificationModel.belongsTo(User,{foreignKey: 'user_id'});
UserLocationModel.belongsTo(User,{foreignKey: 'user_id'});

module.exports = {
    UserVerificationModel,
    UserLocationModel
    // UserVerificationModel:require('./user-verification-model'),
    // UserVerificationModel:require('./user-location-model')
};