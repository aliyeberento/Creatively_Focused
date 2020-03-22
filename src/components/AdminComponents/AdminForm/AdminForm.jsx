import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminForm.css';

class AdminForm extends Component {

    state = {
        userToAdd: {
            // firstName: '',
            // lastName: '',
            username: '',
            password: '',
            phone: '',
            isd: '',
            school: '',
            auth: 3
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
        // console.log('finished sumbitting')
        // console.log('user auth level', this.props.store.user)
        this.goDetail();
    }

    goDetail = () => {
        this.props.history.push(`/adminhome`)
    }

    // goDetail = () => {
    // this.props.history.push(`/adminhome`)
    // }

    render() {
        return (
            <div>
                <h1>ADD/EDIT NEW USER</h1>
                <form>
                    <label>
                        Email/Username:
                    <input type="text"
                            onChange={(event) => this.handleNewUser('username', event)} />
                    </label>
                    <br />
                    <label>
                        Password:
                    <input type="password"
                            onChange={(event) => this.handleNewUser('password', event)} />
                    </label>
                    <br />
                    <label>
                        Phone number:
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                            placeholder='(012)-345-6789'
                            max="10"
                            onChange={(event) => this.handleNewUser('phone', event)} >
                        </input>
                    </label>
                    <br />
                    <label>
                        School Name:
                    <input type="text" value={this.state.userToAdd.schoolId}
                            onChange={(event) => this.handleNewUser('isd', event)} />
                    </label>
                    <br />
                    <label>
                        School District:
                    <input type="text" value={this.state.userToAdd.isdId}
                            onChange={(event) => this.handleNewUser('school', event)} />
                    </label>
                    <br />
                    <label>
                        Role/Auth:
                        <select name="role" onChange={(event) => this.handleNewUser('auth', event)} value={this.state.userToAdd.roleAuth} >
                            <option value="3">Teacher</option>
                            <option value="2">School Principal</option>
                            <option value="1">Superintendent</option>
                            <option value="0">CF Admin</option>
                        </select>
                    </label>
                    <br />
                    <button type="button" className="submitBtn" onClick={this.submitBtn}>Submit</button>
                </form>
            </div >
        )
    }
}

const mapStateToProps = (store) => ({
    store
})



export default connect(mapStateToProps)(AdminForm);