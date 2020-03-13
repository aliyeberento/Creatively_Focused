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

module.exports = () => {
    cron.schedule('*/1 * * * *', () => {
        const selectUsers = `
        SELECT "user"."id" AS "user_id",
        "user"."username",
        "user"."prefcomm",
        "student"."firstname",
        "student"."lastname",
        "student_event"."due_date",
        "student_event"."completed",
        "event"."task",
        "event"."notes"
        FROM "user"
        INNER JOIN "student" ON "student"."teacher" = "user"."id"
        INNER JOIN "student_event" ON "student"."id" = "student_event"."student_id"
        INNER JOIN "event" ON "student_event"."event_id" = "event"."id"
        WHERE "student_event"."completed"=false AND "student_event"."due_date"=CURRENT_DATE;`
        let users = pool.query(selectUsers)
        users = users.rows;
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
            for(i=0; i<results.rows.length; i++){
            const mailOptions = {
                from: process.env.EMAIL,
                to: results.rows[i].username,
                subject: 'test', 
                text: 'test',
                html: `<p>Looks like you have a(n) ${results.rows[i].task} on ${results.rows[i].due_date} coming up. 
                I'll make sure you and the other team members are ready for this meeting by helping you space out the work. 
                Let's get to work!</p>`
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('err', err)
                } else {
                    console.log('info', info);
                }
            });
        }
    });
}
