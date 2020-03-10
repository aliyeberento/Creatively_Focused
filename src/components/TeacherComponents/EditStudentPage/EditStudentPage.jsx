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
                    <label>First Name: <input type="text" placeholder="first name" defaultValue={selectedStudent && selectedStudent.firstname}></input></label><br />
                    <label>Last Name: <input type="text" placeholder="last name" defaultValue={selectedStudent && selectedStudent.lastname}></input></label><br />
                    <label>Grade: <input type="number" placeholder="grade" defaultValue={selectedStudent && selectedStudent.grade}></input></label><br />
                    <label>Student ID: <input type="number" placeholder="id number" defaultValue={selectedStudent && selectedStudent.student_id}></input></label><br />
                    <label>Next IEP: <input type="date" placeholder="next iep date" defaultValue={selectedStudent && selectedStudent.next_iep}></input></label><br />
                    <label>Next EVAL: <input type="date" placeholder="next eval date" defaultValue={selectedStudent && selectedStudent.next_eval}></input></label><br />
                    <label>Disability Category: <input type="number" placeholder="disability category" defaultValue={selectedStudent && selectedStudent.disability_cat}></input></label><br />
                    <label>Federal Setting: <input type="number" placeholder="federal setting" defaultValue={selectedStudent && selectedStudent.fed_setting}></input></label><br />
                    <label>Date of Birth: <input type="date" placeholder="birthdate" defaultValue={selectedStudent && selectedStudent.birthdate}></input></label><br />
                    <label>Student Notes: <input type="text" placeholder="notes" defaultValue={selectedStudent && selectedStudent.notes}></input></label><br />
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