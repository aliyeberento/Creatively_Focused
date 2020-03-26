const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// adds a new student to the database's "student" table

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    let newStudent = req.body;
    let queryText1 = `
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 
        TO_TIMESTAMP($10, 'YYYY/MM/DD') + interval '1 year', $11, 
        TO_TIMESTAMP($12, 'YYYY/MM/DD') + interval '3 year', $13, 
        $14, $15, $16) 
        RETURNING("id");`
    let values1 = [
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
        req.user.id]

// IF YOU CAN FIGURE OUT HOW TO USE THE RETURNING ID FROM THE ABOVE POST 
// PLUG IT IN TO THE ID VALUE IN THE BELOW VALUES2 VARIABLE
// WHICH WILL GENERATE IEP DEADLINES BASED ON THE USER INPUTTED DATE
// FOR THE PREV_IEP

    // let queryText2 = `
    //     INSERT INTO "student_event"
    //     ("student_id", "event_id", "due_date") 
    //     VALUES
    //     ($17, $18, TO_TIMESTAMP($19, 'YYYY/MM/DD') + interval '1 year - 15 days'),
    //     ($20, $21, TO_TIMESTAMP($22, 'YYYY/MM/DD') + interval '1 year - 10 days'),
    //     ($23, $24, TO_TIMESTAMP($25, 'YYYY/MM/DD') + interval '1 year - 3 days'),
    //     ($26, $27, TO_TIMESTAMP($28, 'YYYY/MM/DD') + interval '1 year - 1 day'),
    //     ($29, $30, TO_TIMESTAMP($31, 'YYYY/MM/DD'),
    //     ($32, $33, TO_TIMESTAMP($34, 'YYYY/MM/DD') + interval '1 year + 1 day'),
    //     ($35, $36, TO_TIMESTAMP($37, 'YYYY/MM/DD') + interval '1 year + 10 days'),
    //     ($38, $39, TO_TIMESTAMP($40, 'YYYY/MM/DD') + interval '1 year + 24 days'),
    //     ($41, $42, TO_TIMESTAMP($43, 'YYYY/MM/DD') + interval '17 year');
    //     `
    //     let values2 = [
    //         id, 1, newStudent.prev_iep,
    //         id, 2, newStudent.prev_iep,
    //         id, 3, newStudent.prev_iep,
    //         id, 4, newStudent.prev_iep,
    //         id, 5, newStudent.prev_iep,
    //         id, 6, newStudent.prev_iep,
    //         id, 7, newStudent.prev_iep,
    //         id, 8, newStudent.prev_iep,
    //         id, 9, newStudent.birthdate,
    //     ]
    pool.query(queryText1, values1, 
        // queryText2, values2
        )
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error in addStudent post req in server', error);
            res.sendStatus(500);
        });
});

module.exports = router;