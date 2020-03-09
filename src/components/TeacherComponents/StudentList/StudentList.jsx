import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class StudentList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_STUDENT' });
    }

    detailsBtn = () => {
        console.log('view button clicked')
    }

    addStudent = () => {
        this.props.history.push(`/addstudent`);
    }

    render() {
        return (
            <div>
                <h1>STUDENT LIST</h1>
                <button onClick={this.addStudent}>Add Student</button>
                <ul>
                    {this.props.student.map((student) => {
                        return <li key={student.id}>{student.firstname} {student.lastname}
                            
                            <button onClick={() => this.detailsBtn(student.id)}>View Details</button>
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