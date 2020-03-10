import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class StudentDetailPage extends Component {

    // GET request for details of the item clicked on
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_STUDENT_DETAIL',
            payload: this.props.match.params.id
        })
    }

    // directs the admin to an edit page pre-populated with the items info
    goEdit = () => {
        console.log('clicking to go edit', this.props.match.params.id);
        this.props.history.push(`/editstudent/${this.props.match.params.id}`)
    }

    // dispatches a DELETE to the database via redux saga for the item clicked on
    deleteOpp = () => {
        console.log('clicking to delete');
        this.props.dispatch({
            type: 'DELETE_OPP',
            payload: this.props.match.params.id
        })
        this.props.history.push(`/`)
    }

    render() {
        let student = this.props.reduxState.studentDetail;
        return (
            <div>
                <h1>{student.lastname}, {student.firstname}</h1>
                <p>Date of Birth: {student.birthdate}</p>
                <p>Grade: {student.grade}</p>
                <p>Teacher: {student.teacher}</p>
                <p>School: {student.school_id}</p>
                <p>Student ID: {student.student_id}</p>
                <p>Disability Category: {student.disability_cat}</p>
                <p>Federal Setting: {student.fed_setting}</p>
                <p>Grade: {student.grade}</p>
                <p>Grade: {student.grade}</p>
                <p>Grade: {student.grade}</p>
                <p>Grade: {student.grade}</p>
                <p>Grade: {student.grade}</p>
                <p>Notes: {student.notes}</p>
                <button>edit student</button><br />
                <button>delete student</button>
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