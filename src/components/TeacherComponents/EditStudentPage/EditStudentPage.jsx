import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class EditStudentPage extends Component {

    state = {
        student: {
            firstname: this.props.student.firstname,
            lastname: '',
            grade: '',
            student_id: '',
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

    componentDidMount() {
        this.props.dispatch({type: 'GET_STUDENT',})
    }

    updateStudent = (event, propertyValue) => {
        console.log('making a new student in state', this.state.student);
        // this function should spread local state
        // update the student object in local
    }

    submitStudent = () => {
        console.log('submitting updated student:', this.state.student);
        // this should dispatch an action
        // and then use withRouter to push history to student list
        // or this student's updated detail
    }

    render() {
        console.log(this.props.student);
        console.log(this.props.match.params.id);
        console.log(this.state.student);
        console.log('student reducer contents:', this.props.student);
        console.log(this.props.student.filter(student => student.id == this.props.match.params.id));
        let selectedStudent = this.props.student.filter(student => student.id == this.props.match.params.id)[0];
        console.log(selectedStudent);        
        // let studentToEdit = this.props.student.filter(student => student.id == this.props.match.params.id)[0];
        return (
            <div>
                <h1>Edit Student</h1>
                <form>
                    <input type="text" placeholder="first name" defaultValue={selectedStudent && selectedStudent.firstname}></input>
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

const mapStateToProps = (state) => ({
    student: state.student,
    user: state.user
});

export default connect(mapStateToProps)(EditStudentPage);