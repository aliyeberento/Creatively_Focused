const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // CONDITIONAL FOR USER AUTH
    // AUTH 1 BY ISD == REQ.USER.ISD_ID
    // AUTH 2 BY SCHOOL == REQ.USER.SCHOOL_ID
    
    console.log('req.user:', req.user);
    const queryText = `SELECT "user"."id" AS "user_id",
    "event"."task",
    "event"."date",
    "event"."id",
    "event"."notes"
    FROM "user"
    INNER JOIN "student" ON "student"."teacher" = "user"."id"
    INNER JOIN "student_event" ON "student"."id" = "student_event"."student_id"
    INNER JOIN "event" ON "student_event"."event_id" = "event"."id"
    WHERE "user"."id" = $1`
    pool.query(queryText, [req.user.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentEvent in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;