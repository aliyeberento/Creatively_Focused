const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // CONDITIONAL FOR USER AUTH
    // AUTH 1 BY ISD == REQ.USER.ISD_ID
    // AUTH 2 BY SCHOOL == REQ.USER.SCHOOL_ID

    console.log('req.user:', req.user);
    const queryText = `SELECT "event".task, "student_event".due_date, 
    "student".firstname, "student".lastname, "student_event".completed 
    FROM "student"
    JOIN "student_event" on "student_event".student_id = "student".id
    JOIN "event" on "student_event".event_id = "event"."id"
    WHERE "student_event".completed = FALSE
    `
    pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentEvent in server', error);
            res.sendStatus(500);
        });
});

// conditional get for student event tasks
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    // superintendents see events for their school's students 
    if (req.user.auth == 1) {
        console.log('superintendent isd:', req.user.isd);
        const isd = [req.user.isd]
        const queryText = `SELECT "user"."firstname" AS "teacher_firstname",
        "user"."lastname" AS "teacher_lastname",
        "student"."firstname" AS "student_firstname",
        "student"."lastname" AS "student_lastname",
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
        ORDER BY "user"."lastname" ASC;`
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
        const queryText = `SELECT "user"."firstname" AS "teacher_firstname",
        "user"."lastname" AS "teacher_lastname",
        "student"."firstname" AS "student_firstname",
        "student"."lastname" AS "student_lastname",
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
        ORDER BY "user"."lastname" ASC;`
        pool.query(queryText, school)
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                console.log('Error GET route /api/studentEvent in server', error);
                res.sendStatus(500);
            });
    } else {
        // teachers see events for only their students
        const queryText = `SELECT "student"."firstname" AS "student_firstname",
        "student"."lastname" AS "student_lastname",
        "student_event"."due_date",
        "student_event"."notes",
        "student_event"."completed",
        "student_event"."date_completed",
        "event"."task"
        FROM "user" 
        JOIN "student" ON "student"."teacher" = "user"."id"
        JOIN "student_event" ON "student"."id" = "student_event"."student_id"
        JOIN "event" ON "student_event"."event_id" = "event"."id"
        WHERE (auth <= 3) AND ("teacher" = $1) AND ("student_event".completed = FALSE)
        ORDER BY "user"."lastname" ASC;`
        pool.query(queryText, [req.user.id])
            .then(results => {
                res.send(results.rows);
            }).catch(error => {
                console.log('Error GET route /api/studentEvent in server', error);
                res.sendStatus(500);
            });
    }
});

// updates a single student
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in router PUT for studentEvent', req.body);
    let sqlText = `
    UPDATE "student_event" 
        SET 
            "completed"=$1
            WHERE "id"=${req.params.id};`;
    let values = [req.body.completed];
    console.log(req.params)
    pool.query(sqlText, values)
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;