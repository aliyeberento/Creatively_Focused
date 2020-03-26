const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// conditional get for student event tasks
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    // superintendents see events for their school's students
    if (req.user.auth == 0) {
        const queryText = `SELECT 
        "user"."firstname" AS "teacher_firstname",
        "user"."lastname" AS "teacher_lastname",
        "user"."id" AS "user_id",
        "student"."firstname" AS "student_firstname",
        "student"."lastname" AS "student_lastname",
        "student"."id" AS "student_id",
        "student_event"."id",
        "student_event"."due_date",
        "student_event"."notes",
        "student_event"."completed",
        "student_event"."date_completed",
        "event"."task",
        "school"."name"
        FROM "user" 
        JOIN "student" ON "student"."teacher" = "user"."id"
        JOIN "student_event" ON "student"."id" = "student_event"."student_id"
        JOIN "event" ON "student_event"."event_id" = "event"."id"
        JOIN "school" ON "user"."school" = "school"."id"
        WHERE (auth <= 3) AND ("student_event".completed = FALSE)
        ORDER BY "student_event"."due_date" ASC;`
        pool.query(queryText)
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                console.log('Error GET route /api/studentEvent in server', error);
                res.sendStatus(500);
            }); 
        } else if (req.user.auth == 1) {
        console.log('superintendent isd:', req.user.isd);
        const isd = [req.user.isd]
        const queryText = `SELECT 
        "user"."firstname" AS "teacher_firstname",
        "user"."lastname" AS "teacher_lastname",
        "user"."id" AS "user_id",
        "student"."firstname" AS "student_firstname",
        "student"."lastname" AS "student_lastname",
        "student"."id" AS "student_id",
        "student_event"."id",
        "student_event"."due_date",
        "student_event"."notes",
        "student_event"."completed",
        "student_event"."date_completed",
        "event"."task",
        "school"."name"
        FROM "user" 
        JOIN "student" ON "student"."teacher" = "user"."id"
        JOIN "student_event" ON "student"."id" = "student_event"."student_id"
        JOIN "event" ON "student_event"."event_id" = "event"."id"
        JOIN "school" ON "user"."school" = "school"."id"
        WHERE (auth <= 3) AND ("isd" = $1) AND ("student_event".completed = FALSE)
        ORDER BY "student_event"."due_date" ASC;`
        pool.query(queryText, isd)
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                console.log('Error GET route /api/studentEvent in server', error);
                res.sendStatus(500);
            });
    } else if (req.user.auth == 2) {
        // principals see events for their teacher's student
        console.log('principal school:', req.user.school);
        const school = [req.user.school]
        const queryText = `SELECT 
        "user"."firstname" AS "teacher_firstname",
        "user"."lastname" AS "teacher_lastname",
        "user"."id" AS "user_id",
        "student"."firstname" AS "student_firstname",
        "student"."lastname" AS "student_lastname",
        "student"."id" AS "student_id",
        "student_event"."id",
        "student_event"."due_date",
        "student_event"."notes",
        "student_event"."completed",
        "student_event"."date_completed",
        "event"."task"
        FROM "user" 
        JOIN "student" ON "student"."teacher" = "user"."id"
        JOIN "student_event" ON "student"."id" = "student_event"."student_id"
        JOIN "event" ON "student_event"."event_id" = "event"."id"
        JOIN "school" ON "user"."school" = "school"."id"
        WHERE (auth <= 3) AND ("school" = $1) AND ("student_event".completed = FALSE)
        ORDER BY "student_event"."due_date" ASC;`
        pool.query(queryText, school)
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                console.log('Error GET route /api/studentEvent in server', error);
                res.sendStatus(500);
            });
    } else {
        // teachers see events for only their students
        const queryText = `SELECT 
        "student"."firstname" AS "student_firstname",
        "student"."lastname" AS "student_lastname",
        "user"."id" AS "user_id",
        "student"."id" AS "student_id",
        "student_event"."due_date",
        "student_event"."notes",
        "student_event"."completed",
        "student_event"."date_completed",
        "student_event"."id",
        "event"."task"
        FROM "user" 
        JOIN "student" ON "student"."teacher" = "user"."id"
        JOIN "student_event" ON "student"."id" = "student_event"."student_id"
        JOIN "event" ON "student_event"."event_id" = "event"."id"
        WHERE (auth <= 3) AND ("teacher" = $1) AND ("student_event".completed = FALSE)
        ORDER BY "student_event"."due_date" ASC;`
        pool.query(queryText, [req.user.id])
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                console.log('Error GET route /api/studentEvent in server', error);
                res.sendStatus(500);
            });
    }
});

// updates a single student's event
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in router PUT for studentEvent', req.body);
    let sqlText = `
    UPDATE "student_event" 
    SET "completed" = NOT "completed",
    "date_completed" = now(),
    "completed_by" = ${req.user.id}
    WHERE "id"=${req.body.id};`
    pool.query(sqlText)
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

router.post('/', rejectUnauthenticated, (res) => {
    console.log('in studentEvent.router POST');
    let queryText = 

        // The SQL query that follows should add all of this student upcoming
        // events and deadlines. They should be checked again this user's
        // district calendar in the "calendar" table.

    `
    INSERT INTO "student_event" 
    ("student_id", "event_id", "due_date") 
    VALUES()
    `
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addStudent post req in server', error);
            res.sendStatus(500);
        });

});

// this delete route does not remove any data from the table
// those are valuable records that may be needed in the future
// this delete route simply updates each of the student's events
// to a completed status, and stamps them with the current time
// and the id of the user that commited the action.

router.delete('/', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    console.log('in delete route', id)
    const queryText = `UPDATE "student_event" 
    SET "completed" = NOT "completed",
    "date_completed" = now(),
    "completed_by" = ${req.user.id}
    WHERE "student_id"=${req.body.id};`
    pool.query(queryText, [id])
        .then(() => { res.sendStatus(200) })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});

module.exports = router;