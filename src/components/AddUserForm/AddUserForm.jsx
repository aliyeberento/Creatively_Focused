import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddUserForm.css';

class AddUserForm extends Component {

    state = {
        userToAdd: {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            phone: '',
            isd: this.props.store.user.isd,
            school: this.props.store.user.school,
            auth: 3
        }
    }

    handleNewUser = (event, propertyName) => {
        this.setState({
            userToAdd: {
                ...this.state.userToAdd,
                [propertyName]: event.target.value
            }
        }, () => {
            console.log(this.state.userToAdd)
        })
    }

    handleNewUserInt = (event, propertyName) => {
        this.setState({
            userToAdd: {
                ...this.state.userToAdd,
                [propertyName]: Number(event.target.value)
            }
        }, () => {
            console.log(this.state.userToAdd)
        })
    }

    submitBtn = (event) => {
        event.preventDefault()
        console.log('submitting:', this.state.userToAdd)
        this.props.dispatch({
            type: 'ADD_USER',
            payload: this.state.userToAdd
        })
        this.goDetail();
    }

    goDetail = () => {
        this.props.history.push(`/adminhome`)
    }

    render() {
        if (this.props.store.user.auth === 0) {
            return (
                <div>
                    <h1>ADD NEW USER</h1>
                    <form>
                        <label>
                            First Name:
                        <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'firstname')} />
                        </label>
                        <br />
                        <label>
                            Last Name:
                        <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'lastname')} />
                        </label>
                        <br />
                        <label>
                            Email/Username:
                        <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'username')} />
                        </label>
                        <br />
                        <label>
                            Password:
                        <input type="password"
                                onChange={(event) => this.handleNewUser(event, 'password')} />
                        </label>
                        <br />
                        <label>
                            Phone number:
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                                placeholder='(012)-345-6789'
                                max="10"
                                onChange={(event) => this.handleNewUser(event, 'phone')} >
                            </input>
                        </label>
                        <br />
                        <label>
                            Role/Auth:
                        <select name="auth" onChange={(event) => this.handleNewUserInt(event, 'auth')} value={this.state.userToAdd.auth} >
                                <option >Choose One...</option>
                                <option value="3">Teacher</option>
                                <option value="2">School Principal</option>
                                <option value="1">Superintendent</option>
                                <option value="0">CF Admin</option>
                            </select>
                        </label>
                        <br />
                        <label>District:
                            <select
                                name="district"
                                id="district"
                                onChange={(event) => this.handleNewUserInt(event, 'isd')}>
                                District:
                            <option>Choose one...</option>
                                {this.props.store.districtReducer.map(district => {
                                    return (
                                        <option key={district.id} value={district.id}>{district.state} - {district.isd}</option>
                                    )
                                })}
                            </select>
                        </label>
                        <br />
                        <label>School:
                            <select
                                name="school"
                                id="school"
                                defaultValue="school"
                                placeholder="school"
                                onChange={(event) => this.handleNewUserInt(event, 'school')}>
                                <option>Choose one...</option>
                                {this.props.store.schoolReducer.map(school => {
                                    return (
                                        <option key={school.id} value={school.id}>
                                            {school.name}</option>
                                    )
                                })}
                            </select>
                        </label>
                        <br />
                        <button type="button" className="submitBtn" onClick={this.submitBtn}>Submit</button>
                    </form>
                </div >
            )
        } else if (this.props.store.user.auth === 1) {
            return (
                <div>
                    <h1>ADD/EDIT NEW USER</h1>
                    <form>
                        <label>
                            First Name:
                            <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'firstname')} />
                        </label>
                        <br />
                        <label>
                            Last Name:
                            <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'lastname')} />
                        </label>
                        <br />
                        <label>
                            Email/Username:
                            <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'username')} />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password"
                                onChange={(event) => this.handleNewUser(event, 'password')} />
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
                            Role/Auth:
                            <select name="auth" onChange={(event) => this.handleNewUserInt(event, 'auth')} value={this.state.userToAdd.auth} >
                                <option >Choose One...</option>
                                <option value="3">Teacher</option>
                                <option value="2">School Principal</option>
                            </select>
                        </label>
                        <br />
                        <label>School:
                            <select
                                name="school"
                                id="school"
                                defaultValue="school"
                                placeholder="school"
                                onChange={(event) => this.handleNewUserInt(event, 'school')}>
                                <option>Choose one...</option>
                                {this.props.store.schoolReducer.map(school => {
                                    return (
                                        <option key={school.id} value={school.isd_id} >
                                            {school.name}</option>
                                    )
                                })}
                            </select>
                        </label><br />
                        <button type="button" className="submitBtn" onClick={this.submitBtn}>Submit</button>
                    </form>
                </div >
            )
        } else if (this.props.store.user.auth === 2) {
            return (
                <div>
                    <h1>ADD/EDIT NEW USER</h1>
                    <form>
                        <label>
                            First Name:
                        <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'firstname')} />
                        </label>
                        <br />
                        <label>
                            Last Name:
                        <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'lastname')} />
                        </label>
                        <br />
                        <label>
                            Email/Username:
                        <input type="text"
                                onChange={(event) => this.handleNewUser(event, 'username')} />
                        </label>
                        <br />
                        <label>
                            Password:
                        <input type="password"
                                onChange={(event) => this.handleNewUser(event, 'password')} />
                        </label>
                        <br />
                        <label>
                            Phone number:
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                                placeholder='(012)-345-6789'
                                max="10"
                                onChange={(event) => this.handleNewUser(event, 'phone')} >
                            </input>
                        </label>
                        <br />
                        <button type="button" className="submitBtn" onClick={this.submitBtn}>Submit</button>
                    </form>
                </div >
            )
        }
    }
}

const mapStateToProps = (store) => ({
    store
})

export default connect(mapStateToProps)(AddUserForm);