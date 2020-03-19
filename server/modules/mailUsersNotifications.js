const pool = require('./pool');

//queries db for users with a deadline
module.exports = async () => {
    const selectUsers = `
        SELECT "user"."id" AS "user_id",
        "user"."username",
        "user"."prefcomm",
        "student"."firstname",
        "student"."lastname",
        "student_event"."due_date",
        "student_event"."completed",
        "event"."task"
        FROM "user"
        INNER JOIN "student" ON "student"."teacher" = "user"."id"
        INNER JOIN "student_event" ON "student"."id" = "student_event"."student_id"
        INNER JOIN "event" ON "student_event"."event_id" = "event"."id"
        WHERE "student_event"."completed"=false AND "student_event"."due_date"=CURRENT_DATE;`
    return pool.query(selectUsers)
        .then(results => {
            console.log('results.rows[0].username', results.rows);
            return results.rows;
        }).catch(error => {
            console.log('Error in email module', error);
        });
}
