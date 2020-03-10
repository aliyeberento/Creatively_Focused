const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {

    let newUser = req.body;

    console.log(req.body);
    let queryText = `INSERT INTO "user" 
    ("username", "password") 
    VALUES ($1, $2);`;
    pool.query(queryText, [newUser.username, newUser.password])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addUser post req in server', error);
            res.sendStatus(500);
        });

});


module.exports = router;