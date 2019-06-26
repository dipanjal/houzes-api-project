let nodemailer = require('nodemailer');
// require('dotenv').config();
let environment = process.env;

const GMAIL_SERVICE_NAME = 'gmail',
    GMAIL_SERVICE_HOST = 'smtp.gmail.com',
    GMAIL_SERVICE_SECURE = false,
    GMAIL_SERVICE_PORT = 587,
    GMAIL_USER_NAME ='dipwsitaus@gmail.com',
    GMAIL_USER_PASSWORD ='g00dpa$$w0rdWsit';

module.exports.GmailTransport = nodemailer.createTransport({
    service: GMAIL_SERVICE_NAME,
    host: GMAIL_SERVICE_HOST,
    secure:GMAIL_SERVICE_SECURE,
    port: GMAIL_SERVICE_PORT,
    auth: {
        user: GMAIL_USER_NAME,
        pass: GMAIL_USER_PASSWORD
    }
});

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'modules/mailer/templates/',
        layoutsDir: 'modules/mailer/templates/',
        // defaultLayout: 'forgot-password-email.html',
    },
    viewPath: 'modules/mailer/templates/',
    extName: '.html'
};

module.exports.ViewOption = (transport, hbs, templateName) => {
    handlebarOptions.viewEngine.defaultLayout = templateName;
    transport.use('compile', hbs(handlebarOptions));
};
