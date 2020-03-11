// NodeMailer setup
require('dotenv').config();
const nodemailer = require('nodemailer');
const cron = require('cron');
const sendMailTo = require('../modules/mailer');

// step 1 
// email transport configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

module.exports = (toDos) => {
    cron.schedule('* 24 * * *', () => {
        // step 2
        // email message options
        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: 'paigewielgos@gmail.com', // list of receivers
            subject: 'test', // Subject line
            text: 'test',
            html: '<p>test</p>'
        }
        // step 3
        // send email
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('err', err)
            } else {
                console.log('info', info);
            }
        });
    });
}
