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
                        First Name:
                    <input type="text"  />
                    </label>
                    <label>
                        Last Name:
                    <input type="text"  />
                    </label>
                    <label>
                        Email/Username:
                    <input type="text" />
                    </label>
                    <label>
                        Password:
                    <input type="password" />
                    </label>
                    <label>
                        School Name:
                    <input type="text" />
                    </label>
                    <label>
                        School District:
                    <input type="text" />
                    </label>
                    <label>
                        Role/Auth:
                        <select name="role">
                            <option value="0">CF Administrator</option>
                            <option value="1">Superintendent</option>
                            <option value="2">School Principal</option>
                            <option value="3">Teacher</option>
                        </select>
                    </label>
                    <button onClick={this.submitBtn}>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(AdminForm);