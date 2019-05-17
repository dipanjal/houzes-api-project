const crypto = require('crypto');

hashUtils = function(){};

hashUtils.generateMD5Hash = (text) => {
    return crypto.createHash('md5')
        .update(text)
        .digest("hex");
};

hashUtils.isEqualMD5Hash = (plainText, hash) => {
    let hash1 = hashUtils.generateMD5Hash(plainText);
    if(hash==hash1){
        return true;
    }
    return false;
};

module.exports = hashUtils;