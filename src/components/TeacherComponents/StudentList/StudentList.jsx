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

    editBtn = () => {
        console.log('view button clicked')
    }

    render() {
        return (
            <div>
                <h1>STUDENT LIST</h1>
                <ul>
                    <li>student 1</li>
                    <li>student 2</li>
                    <li>student 3</li>
                </ul>
                <ul>
                    {this.props.student.map((student) => {
                        return <li key={student.id}>{student.firstname}
                            
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