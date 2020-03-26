// NodeMailer setup
require('dotenv').config();
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const getNotifications = require('../modules/mailUsersNotifications');

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

//email teachers their daily deadline reminders
//Cron will run every morning at 8:00AM
cron.schedule('0 8 * * *', async () => {
    const userResults = await getNotifications();
    for (i = 0; i < userResults.length; i++) {
        let email = userResults[i].username;
        let task = userResults[i].task;
        let dueDate = userResults[i].due_date;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'test',
            text: 'test',
            html: `<p>Looks like you have a(n) ${task} on 
                ${dueDate} coming up. I'll make sure you and the 
                other team members are ready for this meeting by helping you 
                space out the work. Let's get to work!</p>`
        }
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('err', err)
            } else {
                console.log('info', info);
            }
        })
    }
});

