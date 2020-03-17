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
    `
    pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentEvent in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;