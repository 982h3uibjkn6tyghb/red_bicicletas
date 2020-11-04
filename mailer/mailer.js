const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

let mailConfig;
if (process.env.NODE_ENV === "production") {
    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET,
        },
    };
    mailConfig = sgTransport(options);
} else {
    if (process.env.NODE_ENV === "staging") {
        console.log("XXXXXXXXXXXXXXXXX");
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET,
            },
        };
        mailConfig = sgTransport(options);
    } else {
        mailConfig = {
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: process.env.ethereal_user,
                pass: process.env.ethereal_password
            },
        };
    }
}


// const nodemailer = require('nodemailer');

// const mailConfig = {
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'beverly48@ethereal.email',
//         pass: 'tyVFYmXGUPzcemsYfr'
//     }
// };

module.exports = nodemailer.createTransport(mailConfig);