import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminHome.css';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminHome extends Component {
   
    addBtn = () => {
        console.log('add user button clicked')
    }
    render() {
        return (
            <div>
                <h3>Hi, INSERT USERNAME</h3>
                <button onClick={this.addBtn}>Add User</button>
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