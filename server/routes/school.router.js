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
    }
});

// ADD A NEW SCHOOL

router.post('/', rejectUnauthenticated, (req, res) => {
    // req.body = data sent from addUser saga
    let newSchool = req.body;
    console.log(req.body);
    // inserting the data into the user table
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