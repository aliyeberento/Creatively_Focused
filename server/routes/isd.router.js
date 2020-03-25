const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// this get route gets all the ditricts for authorized users

router.get('/', rejectUnauthenticated, (req, res) => {

    // CONDITIONAL FOR USER AUTH
    // AUTH 1 BY ISD == REQ.USER.ISD_ID
    // AUTH 2 BY SCHOOL == REQ.USER.SCHOOL_ID

    if (req.user.auth == 0) {
        console.log(req.user);
        const queryText = `SELECT * 
        FROM "isd"
        ORDER BY "city" ASC`
        pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/isd in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth <= 1) {
        console.log(req.user);
        const queryText = `SELECT * 
        FROM "isd"
        WHERE "isd"."id" = $1
        ORDER BY "city" ASC`
        pool.query(queryText, [req.user.isd_id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/isd in server', error);
            res.sendStatus(500);
        });
    }
});

// This POST route adds a new district to the database's "isd" table

router.post('/', rejectUnauthenticated, (req, res) => {
    let newDistrict = req.body;
    console.log(req.body);
    let queryText = `INSERT INTO "isd" 
    ("city", "isd", "state") 
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [newDistrict.city, newDistrict.isd, newDistrict.state])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in add district post req in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;