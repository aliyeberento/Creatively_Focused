const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const queryText = `SELECT "id", "firstname", "lastname", "birthdate", "grade", "student_id",
    "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", "next_eval",
    "school_id", "isd_id", "notes"
    FROM student WHERE teacher = $1`
    pool.query(queryText, [req.user.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentList in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;