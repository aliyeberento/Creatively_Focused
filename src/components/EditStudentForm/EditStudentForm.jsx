import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import moment from 'moment';

class EditStudentForm extends Component {

    // state = {
    //     studentToEdit: {
    //         firstname: this.props.reduxState.studentDetail.firstname,
    //         lastname: this.props.reduxState.studentDetail.lastname,
    //         grade: this.props.reduxState.studentDetail.grade,
    //         student_id: this.props.reduxState.studentDetail.student_id,
    //         next_iep: this.props.reduxState.studentDetail.next_iep,
    //         next_eval: this.props.reduxState.studentDetail.next_eval,
    //         disability_cat: this.props.reduxState.studentDetail.disability_cat,
    //         fed_setting: this.props.reduxState.studentDetail.fed_setting,
    //         birthdate: this.props.reduxState.studentDetail.birthdate,
    //         notes: this.props.reduxState.studentDetail.notes,
    //         id: this.props.reduxState.studentDetail.id
    //     }
    // }

    // editThisStudent = (event, propertyValue) => {
    //     // build a new object in state
    //     console.log('building a new student', this.state.studentToEdit);
    //     this.setState({
    //         studentToEdit: {
    //             ...this.state.studentToEdit,
    //             [propertyValue]: event.target.value,
    //         }
    //     })
    // }

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
        this.props.dispatch({
            type: 'UPDATE_STUDENT',
            payload: {
                key: propertyValue,
                value: event.target.value
            }
        })
    }

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
        // let student = this.state.studentToEdit;
        console.log(this.props.reduxState.studentDetail);
        return (
            <div>
                <h1>EDIT STUDENT</h1>
                <form>
                    <label>First Name:
                        <input
                            type="text"
                            placeholder="first name"
                            defaultValue={this.props.reduxState.studentDetail.firstname}
                            onChange={(event) => this.updateStudent(event, 'firstname')}
                        />
                    </label><br />
                    <label>Last Name:
                        <input
                            type="text"
                            placeholder="last name"
                            defaultValue={this.props.reduxState.studentDetail.lastname}
                            onChange={(event) => this.updateStudent(event, 'lastname')}
                        />
                    </label><br />
                    <label>Grade:
                        <input
                            type="text"
                            placeholder="grade"
                            defaultValue={this.props.reduxState.studentDetail.grade}
                            onChange={(event) => this.updateStudentInt(event, 'grade')}
                        />
                    </label><br />
                    <label>Date of Birth:
                        <input
                            type="date"
                            placeholder="birthdate"
                            defaultValue="03-01-2020"
                            value="03-01-2020"
                            // defaultValue={moment(this.props.reduxState.studentDetail.birthdate).format('MM-DD-YYYY')}
                            onChange={(event) => this.updateStudent(event, 'birthdate')}
                        />
                    </label><br />
                    <label>Disability Category: 
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
                        </label><br />
                        <label>Federal Setting: 
                            <select name="fed_setting" onChange={(event) => this.updateStudentInt(event, 'fed_setting')}>
                                <option>Choose one...</option>
                                <option value="1">I</option>
                                <option value="2">II</option>
                                <option value="3">III</option>
                                <option value="4">IV</option>
                                <option value="5">V</option>
                            </select>
                        </label><br />
                    <label>Next IEP:
                        <input
                            type="date"
                            placeholder="next iep"
                            defaultValue={this.props.reduxState.studentDetail.next_iep}
                            onChange={(event) => this.updateStudent(event, 'next_iep')}
                        />
                    </label><br />
                    <label>Next EVAL:
                        <input
                            type="date"
                            placeholder="next_eval"
                            defaultValue={this.props.reduxState.studentDetail.next_eval}
                            onChange={(event) => this.updateStudent(event, 'next_eval')}
                        />
                    </label><br />
                    <label>Teacher:
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
                        </select><br />
                    </label>
                    {/* <label>Teacher:
                        <input
                            type="text"
                            placeholder="teacher"
                            defaultValue={this.props.reduxState.studentDetail.teacher}
                            onChange={(event) => this.updateStudent(event, 'teacher')}
                        />
                    </label><br /> */}
                    <label>School:
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
                            {/* <option >Choose One...</option>
                            <option value="8">South High School</option>
                            <option value="7">Patrick Henry High School</option>
                            <option value="6">North High School</option>
                            <option value="5">Johnson High School</option>
                            <option value="4">Como</option>
                            <option value="3">Highland Park Middle School</option>
                            <option value="2">Farmington Junior High</option>
                            <option value="1">Farmington Senior High</option> */}
                        </select>
                    </label><br />
                    <label>Independent School District:
                        <select name="isd" onChange={(event) => this.updateStudentInt(event, 'isd')}>
                            <option >Choose One...</option>
                            {this.props.reduxState.districtReducer.map(district => {
                                    return (
                                        <option key={district.id} value={district.id}>{district.state} - {district.isd}</option>
                                    )
                                })}
                            {/* <option value="3">Saint Paul, MN</option>
                            <option value="2">Mineapolis, MN</option>
                            <option value="1">Farmington, MN</option> */}
                        </select>
                    </label><br />
                    <button type="button" onClick={this.submitEdit}>submit changes</button>
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