const Speakeasy = require('speakeasy');
let Moment = require('moment');

otpUtils = function () {};

otpUtils.generateOTP = ()=>{
    let secret = Speakeasy.generateSecret({ length: 20 }).base32;
    let otp = Speakeasy.totp({
        secret:secret,
        encoding:'base32'
    });
    console.log(otp);
    return otp;
};


otpUtils.getOTPLifeTime = () => {
    let moment = Moment();
    let expiredAt = Moment(moment).add(5,'minutes');
    return expiredAt.format();
};

module.exports = otpUtils;