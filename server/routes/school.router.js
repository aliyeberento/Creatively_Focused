const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET ALL THE SCHOOLS

router.get('/', rejectUnauthenticated, (req, res) => {
    
    console.log(req.user);

    // CONDITIONAL FOR USER AUTH
    // AUTH 1 BY ISD == REQ.USER.ISD_ID
    // AUTH 2 BY SCHOOL == REQ.USER.SCHOOL_ID

    if (req.user.auth == 0) {
        console.log(req.user);
        const queryText = `SELECT * 
        FROM "school"
        ORDER BY "name" ASC`
        pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/school in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth == 1) {
        console.log('superintendent isd:', req.user.isd);
        const isd = [req.user.isd]
        const queryText = `SELECT * 
        FROM "school" WHERE "isd_id" = $1
        ORDER BY "name" ASC`
        pool.query(queryText, isd)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/school in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth == 2) {
        console.log('principal school:', req.user.school);        
        const school = [req.user.school]
        const queryText = `SELECT * 
        FROM "user" WHERE (auth <= 3) AND (school = $1)
        ORDER BY "lastname" ASC`
        pool.query(queryText, school)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/teacherList in server', error);
            res.sendStatus(500);
        });
    }
});

// ADD A NEW SCHOOL

module.exports = router;