const { rejectUnathenticated } = require('../modules/authentication-middleware');
const sendMailTo = require('../modules/mailer');
const router = require('express').Router();
const pool = require('../modules/pool');

require('dotenv').config();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
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
    pool.query(selectUsers)
        .then(results => {
            res.send(results.rows);
            console.log('results.rows', results.rows);
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
            // for(user of results)
            const mailOptions = {
                from: process.env.EMAIL,
                to: results.rows[0].username,
                subject: 'test', 
                text: 'test',
                html: '<p>test</p>'
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log('err', err)
                } else {
                    console.log('info', info);
                }
            });
        }).catch(error => {
            console.log('Error GET route /api/email in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;