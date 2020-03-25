const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

// adds a new user to the database's "user" table

router.post('/', rejectUnauthenticated, (req, res) => {
    let newUser = req.body;
    const password = encryptLib.encryptPassword(newUser.password);
    // inserting the data into the user table
    let queryText = `INSERT INTO "user" 
    ("firstname", "lastname", "username", "password", "phone", "isd", "school", "auth") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [newUser.firstname, newUser.lastname, newUser.username, password, newUser.phone, newUser.isd, newUser.school, newUser.auth])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addUser post req in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;