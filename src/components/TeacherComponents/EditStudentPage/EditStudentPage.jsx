import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class EditStudentPage extends Component {

    state = {
        student: {
            firstName: '',
            lastName: '',
            grade: '',
            idNumber: '',
            previousIep: '',
            previousEval: '',
            disabilityCategory: '',
            federalSetting: '',
            birthdate: '',
            notes: '',
            teacher: '',
            schoolId: '',
            isdId: ''
        }
    }

    updateStudent = (event, propertyValue) => {
        console.log('making a new student in state', this.state.studentToAdd);
        // this function should spread local state
        // update the student object in local
    }

    submitStudent = () => {
        console.log('submitting updated student:', this.state.student.firstname);
        // this should dispatch an action
        // and then use withRouter to push history to student list
        // or this student's updated detail
    }

    render() {
        return (
            <div>
                <h1>Edit Student</h1>
                <form>
                    <input type="text" placeholder="first name"></input>
                    <input type="text" placeholder="last name"></input>
                    <input type="number" placeholder="grade"></input>
                    <input type="number" placeholder="id number"></input>
                    <input type="date" placeholder="previous iep date"></input>
                    <input type="date" placeholder="previous eval date"></input>
                    <input type="number" placeholder="disability category"></input>
                    <input type="number" placeholder="federal setting"></input>
                    <input type="date" placeholder="birthdate"></input>
                    <input type="text" placeholder="notes"></input>
                    <button onClick={this.submitStudent}>update student</button>
                </form>
            </div>
        )
    }
}

export default connect()(EditStudentPage);