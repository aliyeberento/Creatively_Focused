import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddStudentForm extends Component {

    state = {
        studentToAdd: {
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
            // teacher: this.props.user.id,
            // schoolId: this.props.user.school,
            // isdId: this.props.user.isd,
        }
    }

    makeNewStudent = (event, propertyValue) => {
        console.log('making a new student in state', this.state.studentToAdd);
        // this function should spread state
        // build a new student object
    }

    submitNewStudent = () => {
        console.log('submitting a new student', this.state.studentToAdd);
        // this should dispatch an action
        // and then use withRouter to push history to student list
        // or this new student's detail
    }

    render() {
        return (
            <div>
                <h1>ADD NEW STUDENT</h1>
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
                    <button>submit new student</button>
                </form>
            </div>
        )
    }
}

// put redux state on props

export default connect()(AddStudentForm);