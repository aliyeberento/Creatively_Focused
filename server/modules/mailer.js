require('dotenv').config();
const nodemailer = require('nodemailer');

// step 1
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

//step 2
module.exports = (email, textContents, htmlContents) => {
    const mailOptions = {
        from: process.env.NODEMAILER_USER, // sender address
        to: email, // list of receivers
        subject: 'test', // Subject line
        text: textContents,
        html: htmlContents || undefined
    };

    // step 3
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('err', err)
        } else {
            console.log('info', info);
        }
    });
}