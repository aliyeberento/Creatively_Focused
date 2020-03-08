import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminForm.css';
// import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class AdminForm extends Component {

    state = {
        userToAdd: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            schoolId: '',
            isdId: '',
            roleAuth: ''
        }
    }

    makeNewUser = () => {
        console.log('making a new user:', this.state.userToAdd)
        // this function should spread local state,
        // and build a new teacher object
    }

    submitBtn = () => {
        console.log('submitting:', this.state.userToAdd)
        // this should dispatch an action
        // and then use withRouter to push history to teacher list
        // or this new user's detail
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
                            <option value="3">Teacher</option>
                            <option value="2">School Principal</option>
                            <option value="1">Superintendent</option>
                            <option value="0">CF Admin</option>
                        </select>
                    </label>
                    <button onClick={this.submitBtn}>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect()(AdminForm);