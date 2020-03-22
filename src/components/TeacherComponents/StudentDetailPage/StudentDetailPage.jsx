import React, { Component } from 'react';
import { connect } from 'react-redux';

class StudentDetailPage extends Component {

    goToEdit = (id) => {
        console.log('clicking to edit student:', id);
        this.props.history.push(`/editstudent/${id}`)
    }

    goToStudentList = () => {
        console.log('going back to student list');
        this.props.history.push(`/studentlist`)
    }

    render() {
        console.log('student reducer contents:', this.props.student);
        console.log(this.props.match.params.id);
        let selectedStudent = this.props.student.filter(student => student.id == this.props.match.params.id)[0];
        console.log(selectedStudent);
        
        return (
            <div>
                <h1>Student Detail Page</h1>
                <ul>
                    <li>First Name: {selectedStudent && selectedStudent.firstname}</li>
                    <li>Last Name: {selectedStudent && selectedStudent.lastname}</li>
                    <li>Grade: {selectedStudent && selectedStudent.grade}</li>
                    <li>Disability Category: {selectedStudent && selectedStudent.disability_cat}</li>
                    <li>Federal Setting: {selectedStudent && selectedStudent.fed_setting}</li>
                    <li>Student ID: {selectedStudent && selectedStudent.student_id}</li>
                    <li>Initial IEP: {selectedStudent && selectedStudent.initial_iep}</li>
                    <li>Last IEP: {selectedStudent && selectedStudent.prev_iep}</li>
                    <li>Next IEP: {selectedStudent && selectedStudent.next_iep}</li>
                    <li>Last EVAL: {selectedStudent && selectedStudent.prev_eval}</li>
                    <li>Next EVAL: {selectedStudent && selectedStudent.next_eval}</li>
                    <li>Teacher: {selectedStudent && selectedStudent.teacher}</li>
                    <li>School: {selectedStudent && selectedStudent.school_id}</li>
                    <li>District: {selectedStudent && selectedStudent.isd_id}</li>
                </ul>
                <button onClick={() => this.goToEdit(selectedStudent.id)}>EDIT STUDENT</button>
                <br />
                <button onClick={this.goToStudentList}>BACK TO STUDENT LIST</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    student: state.student,
    user: state.user,
});

export default connect(mapStateToProps)(StudentDetailPage);