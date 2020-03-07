import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class StudentRoster extends Component {

    render() {
        return (
            <div>
                <h1>STUDENT LIST</h1>
                <ul>
                    <li>student 1</li>
                    <li>student 2</li>
                    <li>student 3</li>
                </ul>
            </div>
        )
    }
}

export default connect()(StudentRoster);