const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// gets all of the students
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

// get a specific student item
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "student" WHERE "id" = ${req.params.id}`
    pool.query(queryText)
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500)
        })
})

// deletes a single student
router.delete('/:id/', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    console.log('in delete route', id)
    const queryText = 'DELETE FROM "student" WHERE "id" = $1'
    pool.query(queryText, [id])
        .then(() => { res.sendStatus(200) })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});

// updates a single student
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in router PUT', req.body);
    let sqlText = `
        UPDATE "student" 
        SET 
            "firstname"=$1,
            "lastname"=$2,
            "grade"=$3,
            "student_id"=$4,
            "next_iep"=$5,
            "next_eval"=$6,
            "disability_cat"=$7,
            "fed_setting"=$8,
            "birthdate"=$9,
            "notes"=$10
            WHERE "id"=${req.params.id};`;
    let values = [req.body.firstname, req.body.lastname, req.body.grade, req.body.student_id, req.body.next_iep, req.body.next_eval, req.body.disaibility_cat, req.body.fed_setting, req.body.birthdate, req.body.notes];
    pool.query(sqlText, values)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;