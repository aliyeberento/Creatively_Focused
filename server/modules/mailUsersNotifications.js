const pool = require('./pool');
const sendEmail = require('./mailer');

//email all users their daily deadline reminders
module.exports = async function () {
    console.log('firing');
    const selectUsers = `
    SELECT "user"."id" AS "user_id",
    "user"."username",
    "user"."prefcomm",
    "student"."firstname",
    "student"."lastname",
    "student_event"."due_date",
    "student_event"."completed",
    "student_event"."date_completed",
    "event"."task",
    "event"."notes"
    FROM "user"
    INNER JOIN "student" ON "student"."teacher" = "user"."id"
    INNER JOIN "student_event" ON "student"."id" = "student_event"."student_id"
    INNER JOIN "event" ON "student_event"."event_id" = "event"."id";`
}