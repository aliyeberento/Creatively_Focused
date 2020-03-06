import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminForm extends Component {

    render() {
        return (
            <div>
                <h3>Add/Edit User Page</h3>
                <input label="name" />
                <input label="email" />
                <input label="password" />

                
            </div>
        )
    }
}

export default connect()(AdminForm);