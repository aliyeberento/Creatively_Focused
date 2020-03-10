const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

router.post('/', rejectUnauthenticated, (req, res) => {
    // req.body = data sent from addUser saga
    let newUser = req.body;

    console.log(req.body);
    const password = encryptLib.encryptPassword(newUser.password);
    // inserting the data into the user table
    let queryText = `INSERT INTO "user" 
    ("username", "password", "phone", "isd", "school", "auth") 
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [newUser.email, password, newUser.number, newUser.isdId, newUser.schoolId, newUser.roleAuth])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addUser post req in server', error);
            res.sendStatus(500);
        });

});


module.exports = router;