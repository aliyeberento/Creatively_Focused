const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// This route gets all the schools and their relevant information
// based on the logged in user's authority,
// and stores them in a reducer on the client

router.get('/', rejectUnauthenticated, (req, res) => {

    // CONDITIONAL FOR USER AUTH
    // AUTH 1 BY ISD == REQ.USER.ISD_ID
    // AUTH 2 BY SCHOOL == REQ.USER.SCHOOL_ID

    if (req.user.auth == 0) {
        const queryText = `SELECT 
        "school".id,
        "school".name, 
        "school".isd_id,
        "isd".isd, 
        "isd".city, 
        "isd".state
        FROM "school"
        JOIN "isd" on "school".isd_id = "isd".id
        ORDER BY "city" ASC`
        pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/school in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth == 1) {
        const isd = [req.user.isd]
        const queryText = `SELECT 
        "school".id,
        "school".name, 
        "isd".isd, 
        "isd".city, 
        "isd".state
        FROM "school"
        JOIN "isd" on "school".isd_id = "isd".id 
        WHERE "isd_id" = $1
        ORDER BY "name" ASC`
        pool.query(queryText, isd)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/school in server', error);
            res.sendStatus(500);
        });
    }
});

// ADD A NEW SCHOOL

router.post('/', rejectUnauthenticated, (req, res) => {
    let newSchool = req.body;
    let queryText = `INSERT INTO "school" 
    ("name", "isd_id") 
    VALUES ($1, $2);`;
    pool.query(queryText, [newSchool.name, newSchool.isd_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in add school post req in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;