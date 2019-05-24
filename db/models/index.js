let User = require('../../modules/oauth/sequlizer_models').User;
let UserVerificationModel = require('./user-verification-model');

UserVerificationModel.belongsTo(User,{foreignKey: 'user_id'});

module.exports = {
    UserVerificationModel:require('./user-verification-model')
};