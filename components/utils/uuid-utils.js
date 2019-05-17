let  uuid = require('uuid4');
let translator = require('short-uuid')();

uuidUtils = function(){};

uuidUtils.generateUUID = ()=>{
    return  uuid();
};

uuidUtils.generateUUIDWithoutDash = ()=>{
    return  uuid().replace(/-/g, '');
};

uuidUtils.generateShortUUID = ()=>{
    return  translator.new();
};

uuidUtils.translateToShortUUID = (regularUUID)=>{
    return  translator.fromUUID(regularUUID);
};

uuidUtils.translateToRegularUUID = (shortUUID)=>{
    return  translator.toUUID(shortUUID);
};

module.exports = uuidUtils;