import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class StudentList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_STUDENT' });
    }

    detailsBtn = (event, student) => {
        console.log('details button clicked', student)
        this.props.history.push(`/studentdetail/${student.id}`)
    }

    addStudent = () => {
        this.props.history.push(`/addstudent`);
    }

    deleteBtn = (student) => {
        this.props.dispatch({
            type: 'DELETE_STUDENT',
            payload: student
        });
        console.log(student)
    }

    render() {
        console.log('student reducer contents:', this.props.student);
        return (
            <div>
                <h1>STUDENT LIST</h1>
                <button onClick={this.addStudent}>Add Student</button>
                <ul>
                    {this.props.student.map((student) => {
                        return <li key={student.id}>{student.firstname} {student.lastname}
                            <button onClick={(event) => this.detailsBtn(event, student)}>View Details</button>
                            <button onClick={() => this.deleteBtn(student.id)}>Remove</button>
                        </li>
                        }
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    student: state.student,
    user: state.user
});

export default withRouter(connect(mapStateToProps)(StudentList));