import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddStudentForm.css';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

class AddStudentForm extends Component {

    state = {
        studentToAdd: {
            firstname: '',
            lastname: '',
            grade: '',
            student_id: '',
            prev_iep: '',
            prev_eval: '',
            disability_cat: '',
            fed_setting: '',
            birthdate: '',
            notes: '',
            teacher: this.props.state.user.id,
            school_id: this.props.state.user.school,
            isd_id: this.props.state.user.isd,
        }
    }

    // takes the users input and inputs it into local state
    handleAddStudent = (event, propertyName) => {
        this.setState({
            //spreading state and having the propertyName be what the user inputs
            studentToAdd: {
                ...this.state.studentToAdd,
                [propertyName]: event.target.value
            }
        })
    }

    // takes the users input and inputs it into local state
    handleAddStudentInt = (event, propertyName) => {
        this.setState({
            studentToAdd: {
                //spreading state and having the propertyName be what the user inputs
                ...this.state.studentToAdd,
                [propertyName]: Number(event.target.value)
            }
        })
    }

    submitStudent = (event) => {
        event.preventDefault()
        console.log('submitting:', this.state.studentToAdd)
        this.props.dispatch({
            //calls 'SUBMIT_STUDENT' which takes local 
            //state and sends it to redux/database
            type: 'SUBMIT_STUDENT',
            payload: this.state.studentToAdd
        })
        // takes you back to the student list page
        this.props.history.push(`/studentlist`);
    }

    populateInputs = () => {
        console.log('POPULATING');
        this.setState({
            studentToAdd: {
                firstname: 'Jimmy',
                lastname: 'Jackson',
                grade: 8,
                student_id: '827564428',
                initial_iep: '2013-05-15',
                prev_iep: '2019-12-01',
                next_iep: '2020-12-05',
                prev_eval: '2017-11-05',
                next_eval: '2020-11-05',
                disability_cat: 3,
                fed_setting: 3,
                birthdate: '2007-06-20',
                notes: 'English is his second language.',
                teacher: 13,
                school_id: 3,
                isd_id: 3
            }
        })
    }

    render() {
        let student = this.state.studentToAdd
        console.log(student);
        return (
            <div>
                <h1 onClick={this.populateInputs}>ADD NEW STUDENT</h1>
                <form id="AddForm">
{/* first name */}
                    <div id="TextField">
                        <TextField type="text" 
                            label="FIRST NAME" 
                            value={student.firstname}
                            onChange={(event) => this.handleAddStudent(event, 'firstname')} />
                    </div>
                    <br />
{/* last name */}
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="LAST NAME" 
                            value={student.lastname}
                            onChange={(event) => this.handleAddStudent(event, 'lastname')} />
                    </div>
                    <br />
{/* student id */}
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="STUDENT ID" 
                            value={student.student_id}
                            onChange={(event) => this.handleAddStudentInt(event, 'student_id')} />
                    </div>
                    <br />
{/* birthdate */}
                    <div id="TextField">
                        <TextField
                            id="date"
                            label="BIRTHDATE"
                            type="date"
                            value={student.birthdate}
                            style={{minWidth: 166}}
                            onChange={(event) => this.handleAddStudent(event, 'birthdate')}
                            // defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
{/* grade */}
                    <div id="TextField">
                        <FormControl 
                            style={{minWidth: 166}}>
                            <InputLabel>GRADE</InputLabel>
                            <Select 
                                label="GRADE" 
                                name="grade" 
                                id="grade" 
                                value={student.grade}
                                defaultValue="grade" 
                                placeholder="grade" 
                                onChange={(event) => this.handleAddStudentInt(event, 'grade')}>
                                    <MenuItem value="0">K</MenuItem>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="6">6</MenuItem>
                                    <MenuItem value="7">7</MenuItem>
                                    <MenuItem value="8">8</MenuItem>
                                    <MenuItem value="9">9</MenuItem>
                                    <MenuItem value="10">10</MenuItem>
                                    <MenuItem value="11">11</MenuItem>
                                    <MenuItem value="12">12</MenuItem>
                            </Select>
                        </FormControl>
                    </div><br />
{/* disablity cat */}
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>DISABILITY</InputLabel>
                        <Select 
                            label="DISABILITY CATEGORY" 
                            name="disability_cat" 
                            value={student.disability_cat}
                            id="disability_cat" 
                            defaultValue="disability_cat" 
                            placeholder="disability_cat" 
                            onChange={(event) => this.handleAddStudentInt(event, 'disability_cat')}>
                                <MenuItem value="1">Autism</MenuItem>
                                <MenuItem value="2">Deaf-Blindness</MenuItem>
                                <MenuItem value="3">Deafness</MenuItem>
                                <MenuItem value="4">Developmental Delay</MenuItem>
                                <MenuItem value="5">Emotional Disturbance</MenuItem>
                                <MenuItem value="6">Hearing Impairment</MenuItem>
                                <MenuItem value="7">Intellectual Disability</MenuItem>
                                <MenuItem value="8">Multiple Disabilities</MenuItem>
                                <MenuItem value="9">Orthopedic Impairment</MenuItem>
                                <MenuItem value="10">Other Health Impairment</MenuItem>
                                <MenuItem value="11">Specific Learning Disability</MenuItem>
                                <MenuItem value="12">Speech or Language Impairment</MenuItem>
                                <MenuItem value="13">Traumatic Brain Injury</MenuItem>
                                <MenuItem value="14">Visual Impairment Inclucing Blindness</MenuItem>
                        </Select>
                        </FormControl>
                    </div><br />
{/* fed set */}
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>SETTING</InputLabel>
                        <Select 
                            label="FEDERAL SETTING" 
                            name="fed_setting" 
                            id="fed_setting" 
                            value={student.fed_setting}
                            defaultValue="fed_setting" 
                            placeholder="fed_setting" 
                            onChange={(event) => this.handleAddStudentInt(event, 'fed_setting')}>
                                <MenuItem id="MenuItem" value="1">Federal Setting I</MenuItem>
                                <MenuItem id="MenuItem" value="2">Federal Setting II</MenuItem>
                                <MenuItem id="MenuItem" value="3">Federal Setting III</MenuItem>
                                <MenuItem id="MenuItem" value="4">Federal Setting IV</MenuItem>
                                <MenuItem id="MenuItem" value="8">Federal Setting VIII</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                    <br />
{/* prev iep */}
                    <div id="TextField">
                        <TextField
                            id="date"
                            label="PREV IEP"
                            type="date"
                            value={student.prev_iep}
                            style={{minWidth: 166}}
                            onChange={(event) => this.handleAddStudent(event, 'prev_iep')}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <br />
{/* prev eval */}
                    <div id="TextField">
                        <TextField
                            id="date"
                            label="PREV EVAL"
                            type="date"
                            value={student.prev_eval}
                            style={{minWidth: 166}}
                            onChange={(event) => this.handleAddStudent(event, 'prev_eval')}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <br />
{/* notes */}
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="NOTES" 
                            value={student.notes}
                            multiline rowsMax="3" 
                            style={{maxWidth: 166}}
                            onChange={(event) => this.handleAddStudent(event, 'notes')} 
                        />
                    </div>
                    <br />
                    <div id="Button">
                        <Button variant="contained" onClick={this.submitStudent}>ADD STUDENT</Button>
                    </div>
                </form>
{/* <br />
                <form className="form">
                    <div className="set1">
                        <label>First Name: 
                            <input 
                                type="text"  
                                placeholder="first name" 
                                value={student.firstname}
                                onChange={(event) => this.handleAddStudent('firstname', event)}>
                            </input>
                        </label>
                        <label>Last Name: <input type="text" value={student.lastname} placeholder="last name" onChange={(event) => this.handleAddStudent('lastname', event)}></input></label>
                        <label>Student ID: <input type="number" value={student.student_id} placeholder="id number" onChange={(event) => this.handleAddStudentInt('student_id', event)}></input></label>
                        <label>Birthdate: <input type="date" value={student.birthdate} placeholder="birthdate" onChange={(event) => this.handleAddStudent('birthdate', event)}></input></label>
                        <label>Grade: 
                            <select name="grade" value={student.grade} placeholder="grade" onChange={(event) => this.handleAddStudentInt('grade', event)}>
                                <option>Choose One...</option>
                                <option value="0">K</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </label>
                        <label>Disability Category: 
                            <select name="disability_cat" value={student.disability_cat} onChange={(event) => this.handleAddStudentInt('disability_cat', event)}>
                                <option>Choose one...</option>
                                <option value="0">Autism</option>
                                <option value="1">Deaf-Blindness</option>
                                <option value="2">Deafness</option>
                                <option value="3">Developmental Delay</option>
                                <option value="4">Emotional Disturbance</option>
                                <option value="5">Hearing Impairment</option>
                                <option value="6">Intellectual Disability</option>
                                <option value="7">Multiple Disabilities</option>
                                <option value="8">Orthopedic Impairment</option>
                                <option value="9">Other Health Impairment</option>
                                <option value="10">Specific Learning Disability</option>
                                <option value="11">Speech or Language Impairment</option>
                                <option value="12">Traumatic Brain Injury</option>
                                <option value="13">Visual Impairment Inclucing Blindness</option>
                            </select>
                        </label><br />

                        <label>Federal Setting: 
                            <select name="fed_setting" value={student.fed_setting} onChange={(event) => this.handleAddStudentInt('fed_setting', event)}>
                                <option>Choose one...</option>
                                <option value="1">I</option>
                                <option value="2">II</option>
                                <option value="3">III</option>
                                <option value="4">IV</option>
                                <option value="5">V</option>
                            </select>
                        </label><br />
                    </div>
                    <div className="set2">
                        <label>Previous IEP<input type="date" value={student.prev_iep} placeholder="previous iep date" onChange={(event) => this.handleAddStudent('prev_iep', event)}></input></label>
                        <label>Previous EVAL<input type="date" value={student.prev_eval} placeholder="previous eval date" onChange={(event) => this.handleAddStudent('prev_eval', event)}></input></label>
                        <label>Notes<input type="text" value={student.notes} placeholder="notes" onChange={(event) => this.handleAddStudent('notes', event)}></input></label>
                        <button type="button" className="submitBtn" onClick={this.submitStudent}>Submit</button>
                    </div>
                </form> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps)(AddStudentForm));