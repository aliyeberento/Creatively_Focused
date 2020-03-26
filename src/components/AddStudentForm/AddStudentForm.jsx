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
            // spreading state and having the propertyName be what the user inputs
            studentToAdd: {
                ...this.state.studentToAdd,
                [propertyName]: event.target.value
            }
        })
    }

    // takes the user's number inputs and inputs it into local state
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
        this.props.dispatch({
            // calls 'SUBMIT_STUDENT' which takes local 
            // state and sends it to redux/database
            type: 'SUBMIT_STUDENT',
            payload: this.state.studentToAdd
        })
        // takes the user back to the Student List page
        this.props.history.push(`/studentlist`);
    }

    render() {
        let student = this.state.studentToAdd
        return (
            <div>
                <h1>ADD NEW STUDENT</h1>
                <form id="AddForm">
                    <div id="TextField">
                        <TextField type="text" 
                            label="FIRST NAME" 
                            value={student.firstname}
                            onChange={(event) => this.handleAddStudent(event, 'firstname')} />
                    </div>
                    <br />
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="LAST NAME" 
                            value={student.lastname}
                            onChange={(event) => this.handleAddStudent(event, 'lastname')} />
                    </div>
                    <br />
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="STUDENT ID" 
                            value={student.student_id}
                            onChange={(event) => this.handleAddStudentInt(event, 'student_id')} />
                    </div>
                    <br />
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
                    <br />
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
                    </div>
                    <br />
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
                    </div>
                    <br />
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps)(AddStudentForm));