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

    handleNewUser = (propertyName, event) => {
        this.setState({
            userToAdd: {
                ...this.state.userToAdd,
                [propertyName]: event.target.value
            }
        }, () => {
            console.log(this.state.userToAdd)
        })

        // this.setState({
        //     usertoAdd: {
        //         ...this.state.userToAdd,
        //         [propertyName]: event.target.value

                // firstName: event.target.value,
                // lastName: event.target.value,
                // email: event.target.value,
                // password: event.target.value,
                // schoolId: event.target.value,
                // isdId: event.target.value,
                // roleAuth: event.target.value    
            // }
        // })
        // console.log('making a new user:', this.state.userToAdd)
        // this function should spread local state,
        // and build a new teacher object
    }

    submitBtn = (event) => {
        event.preventDefault()
        console.log('submitting:', this.state.userToAdd)
        // this should dispatch an action
        // and then use withRouter to push history to teacher list
        // or this new user's detail
        this.props.dispatch({
            type: 'ADD_USER',
            payload: this.state.userToAdd
        })
    }

    render() {
        return (
            <div>
                <h3>Add/Edit User Page</h3>
                <form>
                    <label>
                        First Name:
                    <input type="text" 
                            onChange={(event) => this.handleNewUser('firstName', event)} />
                    </label>
                    <br />
                    <label>
                        Last Name:
                    <input type="text" 
                            onChange={(event) => this.handleNewUser('lastName', event)} />
                    </label>
                    <br />
                    <label>
                        Email/Username:
                    <input type="text" 
                            onChange={(event) => this.handleNewUser('email', event)} />
                    </label>
                    <br />
                    <label>
                        Password:
                    <input type="password" 
                            onChange={(event) => this.handleNewUser('password', event)} />
                    </label>
                    <br />
                    <label>
                        School Name:
                    <input type="text" value ={this.state.userToAdd.schoolId}
                            onChange = {(event) => this.handleNewUser('schoolId', event)} />
                    </label>
                    <br />
                    <label>
                        School District:
                    <input type="text" value ={this.state.userToAdd.isdId}
                            onChange={(event) => this.handleNewUser('isdId', event)} />
                    </label>
                    <br />
                    <label>
                        Role/Auth:
                        <select name="role" onChange={(event) => this.handleNewUser('roleAuth', event)}  value ={this.state.userToAdd.roleAuth} >
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