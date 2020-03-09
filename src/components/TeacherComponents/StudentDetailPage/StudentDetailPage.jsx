import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class StudentDetailPage extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_STUDENT',
            // payload: this.props.match.params.id
        })
    }

    render() {
        console.log(this.props.match.params.id);
        
        let selectedStudent = this.props.student.filter(student => student.id == this.props.match.params.id)[0];
        // console.log(this.selectedStudent);
        // seslceethis.props.student.filter(student => student.id == this.props.match.params.id)[0]);
        // let selectedStudent = this.props.student.filter(student => student.id == this.props.match.params.id)[0];
        return (
            <div>
                {/* {selectedStudent && selectedStudent} */}
                <h1>Student Detail Page</h1>
                <ul>
                    <li>{selectedStudent && selectedStudent.id}</li>
                    {/* <li>{this.selectedStudent.firstname}</li> */}
                    {/* <li>{JSON.stringify(this.props.student.filter(student => student.id == this.props.match.params.id)[0])}</li> */}
                    {/* <li>{this.props.student.filter(student => student.id == this.props.match.params.id)[0]}</li> */}
                    <li>{selectedStudent && selectedStudent.firstname}</li>
                    <li>{selectedStudent && selectedStudent.lastname}</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <button>EDIT STUDENT</button>
                <br />
                <button>BACK TO STUDENT LIST</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    student: state.student,
    user: state.user,
    // selectedStudent : state.student.filter(student => student.id == this.props.match.params.id)[0],
});

export default connect(mapStateToProps)(StudentDetailPage);