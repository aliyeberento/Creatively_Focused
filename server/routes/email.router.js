const { rejectUnathenticated } = require('../modules/authentication-middleware');
const sendMailTo = require('../modules/mailer');
const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let userRows;
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
            console.log('results.username', results.rows.username);
            
        }).catch(error => {
            console.log('Error GET route /api/email in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;