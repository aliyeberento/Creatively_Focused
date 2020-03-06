import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminHome extends Component {
   
    render() {
        return (
            <div>
                <h3>Hi, INSERT USERNAME</h3>
                <button>Add User</button>
                <ul>
                    <li>list here</li>
                    <li>list here too</li>
                    <li>also list here</li>
                </ul>
            </div>
        )
    }
}

export default connect()(AdminHome);