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
        return (
            <div>
                <h1>{student.lastname}, {student.firstname}</h1>
                <p>Birthdate: {student.birthdate}</p>
                <button onClick={this.editStudent}>edit student</button><br />
                <button onClick={(event) => { if (window.confirm('are you sure you want to delete this student?')) this.deleteStudent(event) }}>delete student</button>
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