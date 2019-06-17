const Joi = require('@hapi/joi');

const UserLocationSchema = Joi.object().keys({
    user_id: Joi.number().integer().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
});

module.exports.validateUserLocation = (data) => {
    return new Promise( (resolve,reject)=> {
        Joi.validate(data,UserLocationSchema, (err,value)=>{
            if(err) reject(err);
            else resolve(value);
        });
    });
};
