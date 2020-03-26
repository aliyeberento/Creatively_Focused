const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all the users based on the logged-in user's authorization level
router.get('/', rejectUnauthenticated, (req, res) => {

    // CONDITIONAL FOR USER AUTH
    // AUTH 1 BY ISD == REQ.USER.ISD_ID
    // AUTH 2 BY SCHOOL == REQ.USER.SCHOOL_ID

    if (req.user.auth == 0) {
        const queryText = `
        SELECT
            "user".id, 
            "user".username,
            "user".firstname,
            "user".lastname,
            "user".phone,
            "isd".isd,
            "isd".city,
            "isd".state,
            "school".name AS "school",
            "user".auth
            FROM "user"
            JOIN "isd" on "isd".id = "user".isd
            JOIN "school" on "school".id = "user".school
            ORDER BY "lastname" ASC
        `
        pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/teacherList in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth == 1) {
        const isd = [req.user.isd]
        const queryText = `
        SELECT
            "user".id, 
            "user".username,
            "user".firstname,
            "user".lastname,
            "user".phone,
            "isd".isd,
            "isd".city,
            "isd".state,
            "school".name AS "school",
            "user".auth
            FROM "user"
            JOIN "isd" on "isd".id = "user".isd
            JOIN "school" on "school".id = "user".school
            WHERE (auth <= 3) AND ("isd" = $1)
            ORDER BY "lastname" ASC`
        pool.query(queryText, isd)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/teacherList in server', error);
            res.sendStatus(500);
        });
    } else if (req.user.auth == 2) {
        const school = [req.user.school]
        const queryText = `
        SELECT
            "user".id, 
            "user".username,
            "user".firstname,
            "user".lastname,
            "user".phone,
            "isd".isd,
            "isd".city,
            "isd".state,
            "school".name AS "school",
            "user".auth
            FROM "user"
            JOIN "isd" on "isd".id = "user".isd
            JOIN "school" on "school".id = "user".school
            WHERE (auth <= 3) AND (school = $1)
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

// get a specific user
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    SELECT
        "user".id, 
        "user".username,
        "user".firstname,
        "user".lastname,
        "user".phone,
        "isd".id,
        "isd".isd,
        "isd".city,
        "isd".state,
        "school".id AS "school",
        "school".name AS "schoolname",
        "user".auth
        FROM "user"
        JOIN "isd" on "isd".id = "user".isd
        JOIN "school" on "school".id = "user".school
        WHERE "user".id = ${req.params.id}`
    pool.query(queryText)
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500)
        })
});

// delete a specific user after their students are all re-assigned to new users
router.delete('/:id/', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    const queryText = 'DELETE FROM "user" WHERE "id" = $1'
    pool.query(queryText, [id])
        .then(() => { res.sendStatus(200) })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});

// updates a single user's information
router.put('/:id', rejectUnauthenticated, (req, res) => {
    let sqlText = `
        UPDATE "user" 
        SET "username"=$1,
        "firstname"=$2,
        "lastname"=$3,
        "phone"=$4,
        "school"=$5,
        "isd"=$6,
        "auth"=$7
        WHERE "id" = ${req.params.id};`;
    let values = [req.body.username, req.body.firstname, req.body.lastname, req.body.phone, req.body.school, req.body.isd, req.body.auth];
    pool.query(sqlText, values)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;