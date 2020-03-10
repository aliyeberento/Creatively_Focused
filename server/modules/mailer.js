// NodeMailer setup
require('dotenv').config();
const nodemailer = require('nodemailer');
const cron = require('cron');

// step 1 
// email transport configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


module.exports = () => {
    cron.schedule("* * 1 * *", () => {
        // step 2
        // email message options
        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: 'test', // Subject line
            text: textContents,
            html: htmlContents || undefined
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
