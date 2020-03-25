const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// adds a new student to the database's "student" table

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    let newStudent = req.body;
    let queryText = `
    INSERT INTO "student" 
    ("firstname", 
    "lastname", 
    "birthdate", 
    "grade", 
    "student_id",
    "disability_cat", 
    "fed_setting", 
    "initial_iep", 
    "prev_iep", 
    "next_iep", 
    "prev_eval", 
    "next_eval", 
    "school_id", 
    "isd_id", 
    "notes", 
    "teacher") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, TO_TIMESTAMP($10, 'YYYY/MM/DD') + interval '1 year', $11, TO_TIMESTAMP($12, 'YYYY/MM/DD') + interval '3 year', $13, $14, $15, $16);`
    pool.query(queryText, [
        newStudent.firstname, 
        newStudent.lastname, 
        newStudent.birthdate, 
        newStudent.grade, 
        newStudent.student_id, 
        newStudent.disability_cat,
        newStudent.fed_setting, 
        newStudent.initial_iep, 
        newStudent.prev_iep,
        newStudent.prev_iep,
        newStudent.prev_eval,
        newStudent.prev_eval, 
        newStudent.school_id, 
        newStudent.isd_id, 
        newStudent.notes, 
        req.user.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addStudent post req in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;