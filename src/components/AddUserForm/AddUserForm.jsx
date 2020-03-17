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

    handleNewUser = (propertyName, event) => {
        this.setState({
            userToAdd: {
                ...this.state.userToAdd,
                [propertyName]: event.target.value
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
                <h1>ADD/EDIT NEW USER</h1>
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
                            Role/Auth:
                        <select name="auth" onChange={(event) => this.handleNewUser('auth', event)} value={this.state.userToAdd.auth} >
                                <option >Choose One...</option>
                                <option value="3">Teacher</option>
                                <option value="2">School Principal</option>
                                <option value="1">Superintendent</option>
                                <option value="0">CF Admin</option>
                            </select>
                        </label>
                        <br />
                        <label>District:
                        <select name="district" id="district" defaultValue="district" placeholder="district" onChange={(event) => this.handleNewUser('district', event)}>District:
                            <option>Choose one...</option>
                                {this.props.store.districtReducer.map(district => {
                                    return (
                                        <option value={district.id} key={district.id}>{district.city}, {district.state} - {district.isd}</option>
                                    )
                                })}
                            </select></label><br />
                        <br />
                        <label>School:
                            <select name="school" id="school" defaultValue="school" placeholder="school" onChange={(event) => this.handleNewUser('school', event)}>
                                <option>Choose one...</option>
                                {this.props.store.schoolReducer.map(school => {
                                    return (
                                        <option value={school.id} key={school.id}>{school.city}, {school.state} - {school.name} - {school.isd}</option>
                                    )
                                })}
                            </select></label><br />
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
                                Role/Auth:
                            <select name="auth" onChange={(event) => this.handleNewUser('auth', event)} value={this.state.userToAdd.auth} >
                                    <option >Choose One...</option>
                                    <option value="3">Teacher</option>
                                    <option value="2">School Principal</option>
                                </select>
                            </label>
                            <br />
                            <label>School:
                                <select name="school" id="school" defaultValue="school" placeholder="school" onChange={(event) => this.handleNewUser('school', event)}>
                                    <option>Choose one...</option>
                                    {this.props.store.schoolReducer.map(school => {
                                        return (
                                            <option value={school.id} key={school.id}>{school.city}, {school.state} - {school.name} - {school.isd}</option>
                                        )
                                    })}
                                </select></label><br />
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