import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddStudentForm.css';

class AddStudentForm extends Component {

    state = {
        studentToAdd: {
            firstName: '',
            lastName: '',
            grade: '',
            idNumber: '2-2-2020',
            previousIep: '2-2-2020',
            previousEval: '2-2-2020',
            disabilityCategory: '',
            federalSetting: '',
            birthdate: '2-2-2020',
            notes: '',
            teacher: this.props.state.user.id,
            // schoolId: this.props.user.school,
            // isdId: this.props.user.isd,
        }
    }

    makeNewStudent = (event, propertyValue) => {
        console.log('making a new student in state', this.state.studentToAdd);
        // this function should spread state
        // build a new student object
        this.setState({
            ...this.state.studentToAdd,
            studentToAdd: event.target.value
        });
    }

    submitNewStudent = () => {
        console.log('submitting a new student', this.state.studentToAdd);
        // this should dispatch an action
        // and then use withRouter to push history to student list
        // or this new student's detail
        this.props.dispatch({
            type: 'SUBMIT_STUDENT',
            payload: this.state.studentToAdd
        });
        this.props.history.push(`/studentlist`);
    }

    render() {
        return (
            <div>
                <h1>ADD NEW STUDENT</h1>
                <form>
                    <label>First Name<input type="text" placeholder="first name"></input></label>
                    <label>Last Name<input type="text" placeholder="last name"></input></label>
                    <label>Grade<input type="number" placeholder="grade"></input></label>
                    <label>Student ID<input type="number" placeholder="id number"></input></label>
                    <label>Previous IEP<input type="date" placeholder="previous iep date"></input></label>
                    <label>Previous Eval<input type="date" placeholder="previous eval date"></input></label>
                    <label>Disability Category<input type="number" placeholder="disability category"></input></label>
                    <label>Federal Setting<input type="number" placeholder="federal setting"></input></label>
                    <label>Birthdate<input type="date" placeholder="birthdate"></input></label>
                    <label>Notes<input type="text" placeholder="notes"></input></label>
                    <button type="button" onClick={this.submitNewStudent}>submit new student</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
});

export default withRouter(connect(mapStateToProps)(AddStudentForm));