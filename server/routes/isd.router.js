const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET ALL THE DISTRICTS

router.get('/', rejectUnauthenticated, (req, res) => {
    
    console.log(req.user);

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
    } 
});

// ADD A NEW DISTRICT

module.exports = router;