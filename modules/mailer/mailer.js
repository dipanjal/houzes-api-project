let hbs = require('nodemailer-express-handlebars'),
    email = 'deals@realacquisitions.com',
    pass = 'Re@1acqcom',
    nodeMailer = require('nodemailer');

let mailer = function(){};

mailer.sendEmail = async () => {

    let testAccount = await nodeMailer.createTestAccount();

    // let smtpTransport = await nodeMailer.createTransport({
    //     service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    //     // host: 'smtp.gmail.com',
    //     // host: 'smtp.gmail.com',
    //     // port: 465,
    //     // secure: true,
    //     auth: {
    //         user: email,
    //         pass: pass
    //     }
    // });

    let smtpTransport = nodeMailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    let handlebarsOptions = {
        viewEngine: 'handlebars',
        viewPath: './templates',
        extName: '.html'
    };

    smtpTransport.use('compile', hbs(handlebarsOptions));

    let data= {
        from: '"Dipanjal Maitra" <dipwsitaus@gmail.com>', // sender address
        to: "dipanjalmaitra@gmail.com", // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    let response = await smtpTransport.sendMail(data, (err,info) => {
        if(err) {
            console.log(err);
            // res.json(err);
        }
        console.log("email is send");
        console.log(info);
        // res.json(info)
    });
};

module.exports = mailer;


