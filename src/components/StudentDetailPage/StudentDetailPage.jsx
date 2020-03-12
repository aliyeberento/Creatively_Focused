import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import TaskList from '../TaskList/TaskList';

class StudentDetailPage extends Component {

    // GET request for details of the item clicked on
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_STUDENT_DETAIL',
            payload: this.props.match.params.id
        })
    }

    // directs the user to an edit page pre-populated with the item's info
    editStudent = () => {
        console.log('clicking to go edit', this.props.match.params.id);
        this.props.history.push(`/editstudent/${this.props.match.params.id}`)
    }

    // dispatches a DELETE to the database via redux saga for the item clicked on
    deleteStudent = () => {
        console.log('clicking to delete');
        this.props.dispatch({
            type: 'DELETE_STUDENT',
            payload: this.props.match.params.id
        })
        this.props.history.push(`/studentlist`)
    }

    render() {
        let student = this.props.reduxState.studentDetail;
        console.log(student);
    
        return (
            <div>
                <h1>{student.lastname}, {student.firstname}</h1>
                <ul>
                <li>Grade: {student.grade}</li>
                <li>Date of Birth: {moment(student.birthdate).format('MM-DD-YYYY')}</li>
                <li>Previous IEP: {moment(student.prev_iep).format('MM-DD-YYYY')}</li>
                <li>Next IEP: {moment(student.next_iep).format('MM-DD-YYYY')}</li>
                <li>Previous EVAL: {moment(student.prev_eval).format('MM-DD-YYYY')}</li>
                <li>Disability Category: {student.disability_cat}</li>
                <li>Federal Setting: {student.fed_setting}</li>
                <li>Teacher: {student.teacher}</li>
                <li>School: {student.school_id}</li>
                <li>ISD: {student.isd_id}</li>
                <li>Notes: {student.notes}</li><br />
                <button onClick={this.editStudent}>edit student</button><br />
                <button onClick={(event) => { if (window.confirm('are you sure you want to delete this student?')) this.deleteStudent(event) }}>delete student</button>
                </ul>
                {/* SHOULD WE HAVE A LIST OF DEALINES HERE? */}
                {/* <ol>
                    <li><input type="checkbox"></input>This is a task.</li>
                    <li><input type="checkbox"></input>This is another task.</li>
                    <li><input type="checkbox"></input>This is a third task.</li>
                </ol> */}
                <TaskList />
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(StudentDetailPage));