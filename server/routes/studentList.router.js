const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// gets all of the students for a specific teacher

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    if (req.user.auth == 0) {
        const queryText = `
        SELECT 
            "student".id,
            "student".firstname, 
            "student".lastname, 
            "student".birthdate, 
            "student".grade, 
            "student".student_id, 
            "student".disability_cat, 
            "student".fed_setting, 
            "student".initial_iep, 
            "student".prev_iep, 
            "student".next_iep, 
            "student".prev_eval, 
            "student".next_eval,
            "student".isd_id,
            "student".school_id, 
            "student".notes,
            "user".firstname AS "teacherfirstname", 
            "user".lastname AS "teacherlastname", 
            "school".name AS "school", 
            "isd".isd, 
            "isd".city, 
            "isd".state
            FROM "student"
            JOIN "user" on "user".id = "student".teacher
            JOIN "school" on "school".id = "student".school_id
            JOIN "isd" on "isd".id = "student".isd_id
            ORDER BY "lastname" ASC
            `
        pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentList in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth == 1) {
        const queryText =`
        SELECT
            "student".id,
            "student".firstname, 
            "student".lastname, 
            "student".birthdate, 
            "student".grade, 
            "student".student_id, 
            "student".disability_cat, 
            "student".fed_setting, 
            "student".initial_iep, 
            "student".prev_iep, 
            "student".next_iep, 
            "student".prev_eval, 
            "student".next_eval, 
            "student".isd_id,
            "student".school_id,
            "student".notes,
            "user".firstname AS "teacherfirstname", 
            "user".lastname AS "teacherlastname", 
            "school".name AS "school", 
            "isd".isd, 
            "isd".city, 
            "isd".state
            FROM "student"
            JOIN "user" on "user".id = "student".teacher
            JOIN "school" on "school".id = "student".school_id
            JOIN "isd" on "isd".id = "student".isd_id
            WHERE "isd_id" = $1
            ORDER BY "lastname" ASC`
        pool.query(queryText, [req.user.isd])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentList in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth == 2) {
        const queryText =`
        SELECT 
            "student".id,    
            "student".firstname, 
            "student".lastname, 
            "student".birthdate, 
            "student".grade, 
            "student".student_id, 
            "student".disability_cat, 
            "student".fed_setting, 
            "student".initial_iep, 
            "student".prev_iep, 
            "student".next_iep, 
            "student".prev_eval, 
            "student".next_eval, 
            "student".isd_id,
            "student".school_id,
            "student".notes,
            "user".firstname AS "teacherfirstname", 
            "user".lastname AS "teacherlastname", 
            "school".name AS "school", 
            "isd".isd, 
            "isd".city, 
            "isd".state
            FROM "student"
            JOIN "user" on "user".id = "student".teacher
            JOIN "school" on "school".id = "student".school_id
            JOIN "isd" on "isd".id = "student".isd_id
            WHERE "school_id" = $1
            ORDER BY "lastname" ASC`
        pool.query(queryText, [req.user.school])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentList in server', error);
            res.sendStatus(500);
        });
    } else {
    const queryText =`
    SELECT 
        "student".id,
        "student".firstname, 
        "student".lastname, 
        "student".birthdate, 
        "student".grade, 
        "student".student_id, 
        "student".disability_cat, 
        "student".fed_setting, 
        "student".initial_iep, 
        "student".prev_iep, 
        "student".next_iep, 
        "student".prev_eval, 
        "student".next_eval, 
        "student".isd_id,
        "student".school_id,
        "student".notes,
        "user".firstname AS "teacherfirstname", 
        "user".lastname AS "teacherlastname", 
        "school".name AS "school", 
        "isd".isd, 
        "isd".city, 
        "isd".state
        FROM "student"
        JOIN "user" on "user".id = "student".teacher
        JOIN "school" on "school".id = "student".school_id
        JOIN "isd" on "isd".id = "student".isd_id
        WHERE "teacher" = $1
        ORDER BY "lastname"`
    pool.query(queryText, [req.user.id])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/studentList in server', error);
            res.sendStatus(500);
        });
    }
});

// get a specific student item
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    SELECT 
        "student".id,
        "student".firstname, 
        "student".lastname, 
        "student".birthdate, 
        "student".grade, 
        "student".student_id, 
        "student".teacher,
        "student".disability_cat, 
        "student".fed_setting, 
        "student".initial_iep, 
        "student".prev_iep, 
        "student".next_iep, 
        "student".prev_eval, 
        "student".next_eval, 
        "student".notes,
        "user".firstname AS "teacherfirstname", 
        "user".lastname AS "teacherlastname", 
        "school".name AS "school", 
        "isd".isd, 
        "isd".city, 
        "isd".state
        FROM "student"
        JOIN "user" on "user".id = "student".teacher
        JOIN "school" on "school".id = "student".school_id
        JOIN "isd" on "isd".id = "student".isd_id
        WHERE "student".id = ${req.params.id}`
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
            "notes"=$10,
            "teacher"=$11,
            "school_id"=$12
            WHERE "id"=${req.params.id};`;
    let values = [req.body.firstname, req.body.lastname, req.body.grade, req.body.student_id, req.body.next_iep, req.body.next_eval, req.body.disability_cat, req.body.fed_setting, req.body.birthdate, req.body.notes, req.body.teacher, req.body.school_id];
    pool.query(sqlText, values)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;