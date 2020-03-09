import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './AdminHome.css';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TEACHER' });
    }

    editBtn = () => {
        console.log('view button clicked')
    }
   
    addBtn = () => {
        console.log('add user button clicked')
    }
    render() {
        return (
            <div>
                <h3>Hi, INSERT USERNAME</h3>
                {/* <button onClick={this.addBtn}>Add User</button> */}
                <ul>
                    <li>list here</li>
                    <li>list here too</li>
                    <li>also list here</li>
                </ul>
                <ul>
                    {this.props.teacher.map((teacher) => {
                        return <li key={teacher.id}>{teacher.username}

                            <button onClick={() => this.detailsBtn(teacher.id)}>View Details</button>
                        </li>
                    }
                    )}

                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    teacher: state.teacher,
    user: state.user
});
export default withRouter(connect(mapStateToProps)(AdminHome));