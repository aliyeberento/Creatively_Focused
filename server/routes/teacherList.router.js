const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all the users
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const queryText = `SELECT * 
    FROM "user" WHERE auth <= 3`
    pool.query(queryText)
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('Error GET route /api/teacherList in server', error);
            res.sendStatus(500);
        });
});

// get a specific user
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "user" WHERE "id" = ${req.params.id}`
    pool.query(queryText)
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500)
        })
});

// delete a specific user
router.delete('/:id/', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    console.log('in delete route', id)
    const queryText = 'DELETE FROM "user" WHERE "id" = $1'
    pool.query(queryText, [id])
        .then(() => { res.sendStatus(200) })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});

// updates a single user
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in router PUT', req.body);
    let sqlText = `
        UPDATE "user" 
        SET "username"=$1,
        "phone"=$2,
        "school"=$3,
        "isd"=$4,
        "auth"=$5
        WHERE "id" = ${req.params.id};`;
    let values = [req.body.username, req.body.phone, req.body.school, req.body.isd, req.body.auth];
    pool.query(sqlText, values)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;