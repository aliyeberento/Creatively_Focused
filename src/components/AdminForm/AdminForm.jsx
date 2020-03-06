import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminForm.css';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminForm extends Component {

    submitBtn = () => {
        console.log('submit button clicked')
    }

    render() {
        return (
            <div>
               <h3>Add/Edit User Page</h3>
                <form>
                    <label>
                        Name:
                    <input type="text"  />
                    </label>
                    <label>
                        Email/Username:
                    <input type="text" />
                    </label>
                    <label>
                        Password:
                    <input type="text" />
                    </label>
                    <label>
                        Disctrict:
                    <input type="text" />
                    </label>
                    <label>
                        Role:
                    <input type="text" />
                    </label>
                    <button onClick={this.submitBtn}>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(AdminForm);