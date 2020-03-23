import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

class EditStudentForm extends Component {

    submitEdit = () => {
        // dispatches edit request to redux/database
        console.log('clicking to submit edit');
        this.props.dispatch({
            type: 'EDIT_STUDENT',
            payload: this.props.reduxState.studentDetail,
            url: `/api/studentList/${this.props.reduxState.studentDetail.id}`
        })
        this.goDetail();
    }

    goDetail = () => {
        // brings the user to a detail page showing all of
        // the information for the item they clicked on
        this.props.history.push(`/studentdetail/${this.props.match.params.id}`)
    }

    updateStudent = (event, propertyValue) => {
        // dispatch calls 'UPDATE_STUDENTS' which'll update 
        //the targeted property and send it to redux/database 
        this.props.dispatch({
            type: 'UPDATE_STUDENT',
            payload: {
                key: propertyValue,
                value: event.target.value
            }
        })
    }
        // dispatch calls 'UPDATE_STUDENTS' which'll update 
        //the targeted property and send it to redux/database 
    updateStudentInt = (event, propertyValue) => {
        this.props.dispatch({
            type: 'UPDATE_STUDENT',
            payload: {
                key: propertyValue,
                value: Number(event.target.value)
            }
        })
    }

    render() {
        console.log(this.props.reduxState.studentDetail);
        console.log(moment(this.props.reduxState.studentDetail.birthdate).format('MM/DD/YYYY'));
        
        return (
            <div>
                <h1>EDIT STUDENT</h1>
                <form id="AddForm">
                    {/* <label>First Name:
                        <input
                            type="text"
                            placeholder="first name"
                            defaultValue={this.props.reduxState.studentDetail.firstname}
                            onChange={(event) => this.updateStudent(event, 'firstname')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField type="text" 
                            label="FIRST NAME" 
                            defaultValue={this.props.reduxState.studentDetail.firstname}
                            onChange={(event) => this.updateStudent(event, 'firstname')} />
                    </div>
                    <br />
                    {/* <label>Last Name:
                        <input
                            type="text"
                            placeholder="last name"
                            defaultValue={this.props.reduxState.studentDetail.lastname}
                            onChange={(event) => this.updateStudent(event, 'lastname')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField type="text" 
                            label="LAST NAME" 
                            defaultValue={this.props.reduxState.studentDetail.firstname}
                            onChange={(event) => this.updateStudent(event, 'lastname')} />
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
                                defaultValue={this.props.reduxState.studentDetail.grade} 
                                placeholder="grade" 
                                onChange={(event) => this.updateStudentInt(event, 'birthdate')}>
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
                    {/* <label>Grade:
                        <input
                            type="text"
                            placeholder="grade"
                            defaultValue={this.props.reduxState.studentDetail.grade}
                            onChange={(event) => this.updateStudentInt(event, 'grade')}
                        />
                    </label> */}
                    <br />

                    {/* <label>Date of Birth:
                        <input
                            type="date"
                            placeholder="birthdate"
                            defaultValue="03/01/2010"
                            value="03-01-2020"
                            onChange={(event) => this.updateStudent(event, 'birthdate')}
                        />
                    </label><br /> */}
                    {/* <label>Disability Category: 
                            <select name="disability_cat" onChange={(event) => this.updateStudentInt(event, 'disability_cat')}>
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
                        </label> */}
                        <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>DISABILITY</InputLabel>
                        <Select 
                            label="DISABILITY CATEGORY" 
                            name="disability_cat" 
                            id="disability_cat" 
                            defaultValue={this.props.reduxState.studentDetail.disability_cat} 
                            placeholder="disability_cat" 
                            onChange={(event) => this.updateStudentInt(event, 'disability_cat')}>
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
                        {/* <label>Federal Setting: 
                            <select name="fed_setting" onChange={(event) => this.updateStudentInt(event, 'fed_setting')}>
                                <option>Choose one...</option>
                                <option value="1">I</option>
                                <option value="2">II</option>
                                <option value="3">III</option>
                                <option value="4">IV</option>
                                <option value="5">V</option>
                            </select>
                        </label> */}
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>SETTING</InputLabel>
                        <Select 
                            label="FEDERAL SETTING" 
                            name="fed_setting" 
                            id="fed_setting" 
                            defaultValue={this.props.reduxState.studentDetail.disability_cat} 
                            placeholder="fed_setting" 
                            onChange={(event) => this.updateStudentInt(event, 'fed_setting')}>
                                <MenuItem id="MenuItem" value="1">Federal Setting I</MenuItem>
                                <MenuItem id="MenuItem" value="2">Federal Setting II</MenuItem>
                                <MenuItem id="MenuItem" value="3">Federal Setting III</MenuItem>
                                <MenuItem id="MenuItem" value="4">Federal Setting IV</MenuItem>
                                <MenuItem id="MenuItem" value="8">Federal Setting VIII</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                        <br />

                    {/* <label>Next IEP: (must occur before {moment(this.props.reduxState.studentDetail.next_iep).format('MM/DD/YYYY')})
                        <input
                            type="date"
                            placeholder="next iep"
                            defaultValue={this.props.reduxState.studentDetail.next_iep}
                            onChange={(event) => this.updateStudent(event, 'next_iep')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField
                            id="date"
                            label="NEXT IEP"
                            type="date"
                            helperText={moment(this.props.reduxState.studentDetail.next_iep).format('MM/DD/YYYY')}
                            defaultValue={this.props.reduxState.studentDetail.next_iep}
                            style={{minWidth: 166}}
                            onChange={(event) => this.updateStudent(event, 'next_iep')}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <br />
                    {/* <label>Next EVAL: (must occur before {moment(this.props.reduxState.studentDetail.next_eval).format('MM/DD/YYYY')})
                        <input
                            type="date"
                            placeholder="next_eval"
                            defaultValue={this.props.reduxState.studentDetail.next_eval}
                            onChange={(event) => this.updateStudent(event, 'next_eval')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField
                            id="date"
                            label="NEXT EVAL"
                            type="date"
                            helperText={moment(this.props.reduxState.studentDetail.next_eval).format('MM/DD/YYYY')}
                            defaultValue={this.props.reduxState.studentDetail.next_eval}
                            style={{minWidth: 166}}
                            onChange={(event) => this.updateStudent(event, 'next_eval')}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <br />
                    {/* <label>Teacher:
                    <select
                            name="teacher"
                            id="teacher"
                            defaultValue="teacher"
                            placeholder="teacher"
                            onChange={(event) => this.updateStudentInt(event, 'teacher')}>
                            <option >Choose One...</option>
                        {this.props.reduxState.teacher.map(teacher => {
                                return (
                                    <option
                                        value={teacher.id}
                                        key={teacher.id}>
                                        {teacher.lastname}, {teacher.firstname}
                                    </option>
                                )
                            })}
                        </select>
                    </label> */}
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>TEACHER</InputLabel>
                        <Select 
                            label="TEACHER" 
                            name="teacher" 
                            id="teacher" 
                            defaultValue={this.props.reduxState.studentDetail.teacher}
                            placeholder="teacher" 
                            onChange={(event) => this.updateStudentInt(event, 'teacher')}>
                            {this.props.reduxState.teacher.map(teacher => {
                                return (
                                    <MenuItem
                                        value={teacher.id}
                                        key={teacher.id}>
                                        {teacher.lastname}, {teacher.firstname}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        </FormControl>
                    </div>
                    <br />
                    {/* <label>School:
                        <select name="school_id"
                            id="school_id"
                            defaultValue="school_id"
                            placeholder="school_id"
                            onChange={(event) => this.updateStudentInt(event, 'school_id')}>
                                <option >Choose One...</option>
                                {this.props.reduxState.schoolReducer.map(school => {
                                    return (
                                        <option key={school.id} value={school.id}>
                                            {school.name}</option>
                                    )
                                })}
                        </select>
                    </label> */}
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>SCHOOL</InputLabel>
                        <Select 
                            label="SCHOOL" 
                            name="SCHOOL" 
                            id="SCHOOL" 
                            defaultValue={this.props.reduxState.studentDetail.school}
                            placeholder="SCHOOL" 
                            onChange={(event) => this.updateStudentInt(event, 'school_id')}>
                                {this.props.reduxState.schoolReducer.map(school => {
                                    return (
                                        <MenuItem key={school.id} value={school.id}>
                                            {school.name}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div>
                    <br />
                    {/* <label>Independent School District:
                        <select name="isd" onChange={(event) => this.updateStudentInt(event, 'isd')}>
                            <option >Choose One...</option>
                            {this.props.reduxState.districtReducer.map(district => {
                                    return (
                                        <option key={district.id} value={district.id}>{district.state} - {district.isd}</option>
                                    )
                                })}
                        </select>
                    </label> */}
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>DISTRICT</InputLabel>
                        <Select 
                            label="DISTRICT" 
                            name="district" 
                            id="district" 
                            defaultValue={this.props.reduxState.studentDetail.district}
                            placeholder="district" 
                            onChange={(event) => this.updateStudentInt(event, 'isd')}>
                            {this.props.reduxState.districtReducer.map(district => {
                                    return (
                                        <MenuItem key={district.id} value={district.id}>{district.state} - {district.isd}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="NOTES" 
                            defaultValue={this.props.reduxState.studentDetail.notes}
                            multiline rowsMax="3" 
                            style={{maxWidth: 166}}
                            onChange={(event) => this.updateStudent(event, 'notes')} 
                        />
                    </div>
                    <br />
                    <div id="Button">
                        <Button variant="contained" onClick={this.submitEdit}>SUBMIT CHANGES</Button>
                    </div>
                </form>
            </div >
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(EditStudentForm));