import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddStudentForm.css';

class AddStudentForm extends Component {

    state = {
        studentToAdd: {
            firstname: '',
            lastname: '',
            grade: '',
            student_id: '',
            prev_iep: '',
            prev_eval: '',
            disability_cat: 0,
            fed_setting: 0,
            birthdate: '',
            notes: '',
            teacher: this.props.state.user.id,
            school_id: this.props.state.user.school,
            isd_id: this.props.state.user.isd,
        }
    }

    handleAddStudent = (propertyName, event) => {
        this.setState({
            studentToAdd: {
                ...this.state.studentToAdd,
                [propertyName]: event.target.value
            }
        })
        // this function should spread local state,
        // and build a new teacher object
    }

    submitStudent = (event) => {
        event.preventDefault()
        console.log('submitting:', this.state.studentToAdd)
        // this should dispatch an action
        // and then use withRouter to push history to teacher list
        // or this new user's detail
        this.props.dispatch({
            type: 'SUBMIT_STUDENT',
            payload: this.state.studentToAdd
        })
        this.props.history.push(`/studentlist`);
    }

    render() {
        return (
            <div>
                <h1>ADD NEW STUDENT</h1>
                <form className="form">
                    <div className="set1">
                        <label>First Name: <input type="text" placeholder="first name" onChange={(event) => this.handleAddStudent('firstname', event)}></input></label>
                        <label>Last Name: <input type="text" placeholder="last name" onChange={(event) => this.handleAddStudent('lastname', event)}></input></label>
                        <label>Student ID: <input type="number" placeholder="id number" onChange={(event) => this.handleAddStudent('student_id', event)}></input></label>
                        <label>Birthdate: <input type="date" placeholder="birthdate" onChange={(event) => this.handleAddStudent('birthdate', event)}></input></label>
                        <label>Grade: <input type="number" placeholder="grade" onChange={(event) => this.handleAddStudent('grade', event)}></input></label>
                        {/* <label>Disability Category: <input type="number" placeholder="disability category" onChange={(event) => this.handleAddStudent('disabilityCategory', event)}></input></label> */}
                        
                        <label>Disability Category: 
                        <select name="disability_cat" onChange={(event) => this.handleAddStudent('disability_cat', event)}>
                        <option value="0">cat</option>
                        <option value="1">cat</option>
                        <option value="2">cat</option>
                        <option value="3">cat</option>
                        <option value="4">cat</option>
                        <option value="5">cat</option>
                        <option value="6">cat</option>
                        <option value="7">cat</option>
                        <option value="8">cat</option>
                        <option value="9">cat</option>
                        <option value="10">cat</option>
                        <option value="11">cat</option>
                        <option value="12">cat</option>
                        <option value="13">cat</option>
                    </select>
                    </label>

                        {/* <label>Federal Setting: <input type="number" placeholder="federal setting" onChange={(event) => this.handleAddStudent('federalSetting', event)}></input></label> */}
                    
                        <label>Federal Setting: 
                        <select name="fed_setting" onChange={(event) => this.handleAddStudent('fed_setting', event)}>
                        <option value="0">cat</option>
                        <option value="1">cat</option>
                        <option value="2">cat</option>
                        <option value="3">cat</option>
                        <option value="4">cat</option>
                        <option value="5">cat</option>
                        <option value="6">cat</option>
                        <option value="7">cat</option>
                        <option value="8">cat</option>
                    </select>
                    </label>
                    </div>
                    <div className="set2">
                        <label>Previous IEP<input type="date" placeholder="previous iep date" onChange={(event) => this.handleAddStudent('prev_iep', event)}></input></label>
                        <label>Previous Eval<input type="date" placeholder="previous eval date" onChange={(event) => this.handleAddStudent('prev_eval', event)}></input></label>
                        <label>Notes<input type="text" placeholder="notes" onChange={(event) => this.handleAddStudent('notes', event)}></input></label>
                        <button type="button" className="submitBtn" onClick={this.submitStudent}>Submit</button>
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