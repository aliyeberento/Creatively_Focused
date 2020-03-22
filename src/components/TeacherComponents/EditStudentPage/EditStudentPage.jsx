import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditStudentPage extends Component {

    state = {
        student: {},
        renderedOnce: false
    }

    updateStudent = (event, propertyValue) => {
        console.log('making a new student in state', this.state.student);
        // this function should spread local state
        // update the student object in local
            this.setState({
                renderedOnce:true
            }, () => {
                this.setState({
                    student: {...this.props.student.filter(student => student.id == this.props.match.params.id)[0]}
                })
            })
        
        
    }

    submitStudent = () => {
        console.log('submitting updated student:', this.state.student);
        // this should dispatch an action
        // and then use withRouter to push history to student list
        // or this student's updated detail
    }

    render() {
        // console.log(this.props.student);
        // console.log(this.props.match.params.id);
        console.log(this.state);
        // console.log('student reducer contents:', this.props.student);
        // console.log(this.props.student.filter(student => student.id == this.props.match.params.id));
        let selectedStudent = this.props.student.filter(student => student.id == this.props.match.params.id)[0];
        console.log(selectedStudent);        
        return (
            <div>
                <h1>Edit Student</h1>
                <form>
                    {selectedStudent && !this.state.renderedOnce ? this.updateStudent() : <></>}
                    <label>First Name: <input type="text" placeholder="first name" defaultValue={this.state.student.firstname}></input></label><br />
                    <label>Last Name: <input type="text" placeholder="last name" defaultValue={this.state.student.lastname}></input></label><br />
                    <label>Grade: <input type="number" placeholder="grade" defaultValue={this.state.student.grade}></input></label><br />
                    <label>Student ID: <input type="number" placeholder="id number" defaultValue={this.state.student.student_id}></input></label><br />
                    <label>Next IEP: <input type="date" placeholder="next iep date" defaultValue={this.state.student.next_iep}></input></label><br />
                    <label>Next EVAL: <input type="date" placeholder="next eval date" defaultValue={this.state.student.next_eval}></input></label><br />
                    <label>Disability Category: <input type="number" placeholder="disability category" defaultValue={this.state.student.disability_cat}></input></label><br />
                    <label>Federal Setting: <input type="number" placeholder="federal setting" defaultValue={this.state.student.fed_setting}></input></label><br />
                    <label>Date of Birth: <input type="date" placeholder="birthdate" defaultValue={this.state.student.birthdate}></input></label><br />
                    <label>Student Notes: <input type="text" placeholder="notes" defaultValue={this.state.student.notes}></input></label><br />
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