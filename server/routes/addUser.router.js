const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

router.post('/', rejectUnauthenticated, (req, res) => {

    let newUser = req.body;

    console.log(req.body);
    const password = encryptLib.encryptPassword(newUser.password);
    let queryText = `INSERT INTO "user" 
    ("username", "password", "isd", "auth") 
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [newUser.email, password, newUser.isdId, newUser.roleAuth])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addUser post req in server', error);
            res.sendStatus(500);
        });

});


module.exports = router;