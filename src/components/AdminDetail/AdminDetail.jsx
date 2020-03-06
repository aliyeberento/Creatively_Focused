import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminDetail extends Component {

    render() {
        return (
            <div>

                <h3>Add/Edit User Page</h3>
                <h5>Name:</h5>
                <h5>School:</h5>
                <h5>Disctrict:</h5>
               

            </div>
        )
    }
}

export default connect()(AdminDetail);