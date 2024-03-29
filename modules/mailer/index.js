const hbs = require('nodemailer-express-handlebars');
let MailConfig = require('./email-config');
let gmailTransport = MailConfig.GmailTransport;

module.exports.sendPasswordResetEmail = (user, data, callback) => {
    MailConfig.ViewOption(gmailTransport,hbs, 'forgot-password-email.html');
    let HelperOptions = {
        from: '"Dip Wsit" <dipwsitaus@gmail.com>',
        to: user.email,
        subject: data.subject,
        template: 'forgot-password-email',
        context: {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            token: data.token,
            first_name: user.first_name,
            url:data.url
        }
    };

    sendEmail(HelperOptions,callback);
};

module.exports.sendUserVerificationEmail = (user, data, callback) => {
    MailConfig.ViewOption(gmailTransport,hbs, 'verify-user-email.html');
    let HelperOptions = {
        from: '"Dip Wsit" <dipwsitaus@gmail.com>',
        to: user.email,
        subject: data.subject,
        template: 'verify-user-email',
        context: {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            token: data.token,
            first_name: user.first_name,
            url:data.url
        }
    };

    sendEmail(HelperOptions,callback);
};

function sendEmail(HelperOptions,callback){
    gmailTransport.sendMail(HelperOptions, (error,info) => {
        if(error) {
            // console.log(error);
            callback(error,null);
        }else{
            console.log('email send to ',HelperOptions.to);
            callback(null,info);
        }
    });
}
