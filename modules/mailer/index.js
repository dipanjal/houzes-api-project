const express = require('express');
const router = express.Router();

const hbs = require('nodemailer-express-handlebars');
let MailConfig = require('./email-config');
let gmailTransport = MailConfig.GmailTransport;

module.exports.sendEmail = (user,data,callback) => {
    MailConfig.ViewOption(gmailTransport,hbs);
    let HelperOptions = {
        from: '"Dip Wsit" <dipwsitaus@gmail.com>',
        to: user.email,
        subject: data.subject,
        template: 'forgot-password-email',
        context: {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            address: "Nikunja-2, Dhaka 1229",
            token: data.token,
            first_name: user.first_name,
            url:data.url
        }
    };
    gmailTransport.sendMail(HelperOptions, (error,info) => {
      if(error) {
        console.log(error);
        callback(error,null);
      }
      console.log("email is send");
      console.log(info);
      callback(null,info);
    });
};
