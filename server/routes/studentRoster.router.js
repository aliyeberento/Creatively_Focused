const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const queryText = `SELECT "firstname", "lastname", "birthdate", "grade", 
    "id_number", "prev_iep", "next_iep", "prev_eval", "next_eval", "disability", 
    "fed_setting", "birthdate", "school_id", "isd_id", "notes" 
    FROM student WHERE teacher = $1`
    pool.query(queryText, [req.user.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentRoster in server', error);
            res.sendStatus(500);
        });
});



module.exports = router;