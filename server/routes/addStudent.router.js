const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {

    let newStudent = req.body;

    console.log(req.body);
    let queryText = `INSERT INTO "student" 
    ("firstname", "lastname", "birthdate", "grade", "student_id",
    "disability_cat", "fed_setting", "initial_iep", "prev_iep", "next_iep", "prev_eval", 
    "next_eval", "school_id", "isd_id", "notes", "teacher") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`;
    pool.query(queryText, [newStudent.firstName, newStudent.lastName, 
        newStudent.birthdate, newStudent.grade, newStudent.idNumber, newStudent.disabilityCategory,
        newStudent.federalSetting, newStudent.initial_iep, newStudent.previousIep, newStudent.next_iep,
        newStudent.previousEval, newStudent.next_eval, newStudent.school_id, newStudent.isd_id, 
        newStudent.notes, req.user.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addStudent post req in server', error);
            res.sendStatus(500);
        });

});


module.exports = router;