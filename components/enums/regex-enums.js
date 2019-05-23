REGEX_ENUMS = {
    US_PHONE:{
        // sample: '+1-541-754-3010',
        pattern: /^((\+1-)?([0-9]{3}-[0-9]{3}-[0-9]{4}))|((\+1)?([0-9]{10}))$/g,
        // pattern: /^(\+1)?([0-9]{10})$/g,
        sample: '+15417543010 or +1-541-754-3010',
        message: 'Invalid Phone'
    }
};

module.exports = REGEX_ENUMS;

