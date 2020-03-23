import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddUserForm.css';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

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
            auth: ''
        }
    }
    // takes the users input and inputs it into local state with its corresponding propertyName
    handleNewUser = (event, propertyName) => {
        this.setState({
            userToAdd: {
                //spreading state and having the propertyName be what the user inputs
                ...this.state.userToAdd,
                [propertyName]: event.target.value
            }
        }, () => {
            console.log(this.state.userToAdd)
        })
    }
    // takes the users input and inputs it into local state with its corresponding propertyName
    handleNewUserInt = (event, propertyName) => {
        this.setState({
            userToAdd: {
                //spreading state and having the propertyName be what the user inputs
                ...this.state.userToAdd,
                [propertyName]: Number(event.target.value)
            }
        }, () => {
            console.log(this.state.userToAdd)
        })
    }
    //sends local state into the addUser Saga/database
    submitBtn = (event) => {
        event.preventDefault()
        console.log('submitting:', this.state.userToAdd)
        this.props.dispatch({
            type: 'ADD_USER',
            payload: this.state.userToAdd
        })
        this.goDetail();
    }
    // when called brings you back to the admin home page
    goDetail = () => {
        this.props.history.push(`/adminhome`)
    }

    populateInputs = () => {
        console.log('prepopulating KEN');
        this.setState({
            userToAdd: {
                firstname: 'Ken',
                lastname: 'Slack',
                username: 'kenslacktheteacher@gmail.com',
                password: '1234',
                phone: '6089874523',
                isd: 3,
                school: 3,
                auth: 3
            }
        })
    }

    render() {
        let userToAdd = this.state.userToAdd
        if (this.props.store.user.auth === 0) {
            return (
                <div>
                <h1 onClick={this.populateInputs}>ADD NEW USER</h1>
                    <form id="AddForm">
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="FIRST NAME" 
                            value={userToAdd.firstname}
                            onChange={(event) => this.handleNewUser(event, 'firstname')} />
                    </div>
                        {/* <label>
                            First Name:
                        <input type="text" value={userToAdd.firstname}
                                onChange={(event) => this.handleNewUser(event, 'firstname')} />
                        </label> */}
                        <br />
                        <div id="TextField">
                        <TextField 
                            type="text" 
                            label="LAST NAME" 
                            value={userToAdd.lastname}
                            onChange={(event) => this.handleNewUser(event, 'lastname')} />
                        </div>
                        {/* <label>
                            Last Name:
                        <input type="text" value={userToAdd.lastname}
                                onChange={(event) => this.handleNewUser(event, 'lastname')} />
                        </label> */}
                        <br />
                        <div id="TextField">
                        <TextField 
                            type="text" 
                            label="USER NAME" 
                            value={userToAdd.username}
                            onChange={(event) => this.handleNewUser(event, 'username')} />
                    </div>
                        {/* <label>
                            Email/Username:
                        <input type="text" value={userToAdd.username}
                                onChange={(event) => this.handleNewUser(event, 'username')} />
                        </label> */}
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="password" 
                                label="password" 
                                value={userToAdd.password} 
                                onChange={(event) => this.handleNewUser(event, 'password')}
                            />
                        </div>
                        {/* <label>
                            Password:
                        <input type="password" value={userToAdd.password}
                                onChange={(event) => this.handleNewUser(event, 'password')} />
                        </label> */}
                        <br />
                        <div id="TextField">
                        <TextField type="tel" 
                            label="PHONE" 
                            value={userToAdd.phone}
                            onChange={(event) => this.handleNewUser(event, 'phone')} />
                        </div>
                        {/* <label>
                            Phone number:
                        <input type="tel" value={userToAdd.phone} id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                                placeholder='(012)-345-6789'
                                max="10"
                                onChange={(event) => this.handleNewUser(event, 'phone')} >
                            </input>
                        </label> */}
                        <br />
                        <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>ROLE/AUTH</InputLabel>
                        <Select 
                            label="AUTH" 
                            name="auth" 
                            id="auth" 
                            value={userToAdd.auth}
                            defaultValue="auth" 
                            placeholder="auth" 
                            onChange={(event) => this.handleNewUserInt(event, 'auth')}>
                                <MenuItem id="MenuItem" value="3">Teacher</MenuItem>
                                <MenuItem id="MenuItem" value="2">School Principal</MenuItem>
                                <MenuItem id="MenuItem" value="1">Superintendent</MenuItem>
                                <MenuItem id="MenuItem" value="0">CF Admin</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                        {/* <label>
                            Role/Auth:
                        <select name="auth" onChange={(event) => this.handleNewUserInt(event, 'auth')} value={userToAdd.auth} >
                                <option >Choose One...</option>
                                <option value="3">Teacher</option>
                                <option value="2">School Principal</option>
                                <option value="1">Superintendent</option>
                                <option value="0">CF Admin</option>
                            </select>
                        </label> */}
                        <br />
                        <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        {/* <InputLabel>DISTRICT</InputLabel> */}
                        <Select 
                            label="DISTRICT" 
                            name="isd" 
                            id="isd" 
                            value={userToAdd.isd}
                            defaultValue="isd" 
                            placeholder="isd" 
                            onChange={(event) => this.handleNewUserInt(event, 'isd')}>
                                {this.props.store.districtReducer.map(district => {
                                    return (
                                        <MenuItem id="MenuItem" key={district.id} value={district.id}>{district.state} - {district.city} - {district.isd}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div>
                        {/* <label>District:
                            <select
                                name="district"
                                value={this.props.store.user.isd}
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
                        </label> */}
                        <br />
                        <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        {/* <InputLabel>SCHOOL</InputLabel> */}
                        <Select 
                            label="SCHOOL" 
                            name="school" 
                            id="school" 
                            value={userToAdd.school}
                            defaultValue="school" 
                            placeholder="school" 
                            onChange={(event) => this.handleNewUserInt(event, 'school')}>
                                {this.props.store.schoolReducer.map(school => {
                                    return (
                                        <MenuItem key={school.id} value={school.id}>
                                            {school.name}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div>
                        {/* <label>School:
                            <select
                                name="school"
                                value={this.props.store.user.school}
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
                        </label> */}
                        <br />
                        <div id="Button">
                            <Button variant="contained" onClick={this.submitBtn}>ADD USER</Button>
                        </div>
                        {/* <button type="button" className="submitBtn" onClick={this.submitBtn}>Submit</button> */}
                    </form>
                </div >
            )
        } else if (this.props.store.user.auth === 1) {
            return (
                <div>
                <h1 onClick={this.populateInputs}>ADD NEW USER</h1>
                    <form id="AddForm">
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="FIRST NAME" 
                            value={userToAdd.firstname}
                            onChange={(event) => this.handleNewUser(event, 'firstname')} />
                    </div>
                        <br />
                        <div id="TextField">
                        <TextField 
                            type="text" 
                            label="LAST NAME" 
                            value={userToAdd.lastname}
                            onChange={(event) => this.handleNewUser(event, 'lastname')} />
                        </div>
                        <br />
                        <div id="TextField">
                        <TextField 
                            type="text" 
                            label="USER NAME" 
                            value={userToAdd.username}
                            onChange={(event) => this.handleNewUser(event, 'username')} />
                    </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="password" 
                                label="password" 
                                value={userToAdd.password} 
                                onChange={(event) => this.handleNewUser(event, 'password')}
                            />
                        </div>
                        <br />
                        <div id="TextField">
                        <TextField type="tel" 
                            label="PHONE" 
                            value={userToAdd.phone}
                            onChange={(event) => this.handleNewUser(event, 'phone')} />
                        </div>
                        <br />
                        <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>ROLE/AUTH</InputLabel>
                        <Select 
                            label="AUTH" 
                            name="auth" 
                            id="auth" 
                            value={userToAdd.auth}
                            defaultValue="auth" 
                            placeholder="auth" 
                            onChange={(event) => this.handleNewUserInt(event, 'auth')}>
                                <MenuItem id="MenuItem" value="3">Teacher</MenuItem>
                                <MenuItem id="MenuItem" value="2">School Principal</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                        <br />
                        <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        {/* <InputLabel>DISTRICT</InputLabel> */}
                        <Select 
                            label="DISTRICT" 
                            name="isd" 
                            id="isd" 
                            value={userToAdd.isd}
                            defaultValue="isd" 
                            placeholder="isd" 
                            onChange={(event) => this.handleNewUserInt(event, 'isd')}>
                                {this.props.store.districtReducer.map(district => {
                                    return (
                                        <MenuItem id="MenuItem" key={district.id} value={district.id}>{district.state} - {district.city} - {district.isd}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div>
                        <br />
                        <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        {/* <InputLabel>SCHOOL</InputLabel> */}
                        <Select 
                            label="SCHOOL" 
                            name="school" 
                            id="school" 
                            value={userToAdd.school}
                            defaultValue="school" 
                            placeholder="school" 
                            onChange={(event) => this.handleNewUserInt(event, 'school')}>
                                {this.props.store.schoolReducer.map(school => {
                                    return (
                                        <MenuItem key={school.id} value={school.id}>
                                            {school.name}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div>
                        <br />
                        <div id="Button">
                            <Button variant="contained" onClick={this.submitBtn}>ADD USER</Button>
                        </div>
                    </form>
                </div >
            )
        } else if (this.props.store.user.auth === 2) {
            return (
                <div>
                <h1 onClick={this.populateInputs}>ADD NEW USER</h1>
                    <form id="AddForm">
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="FIRST NAME" 
                            value={userToAdd.firstname}
                            onChange={(event) => this.handleNewUser(event, 'firstname')} />
                    </div>
                        <br />
                        <div id="TextField">
                        <TextField 
                            type="text" 
                            label="LAST NAME" 
                            value={userToAdd.lastname}
                            onChange={(event) => this.handleNewUser(event, 'lastname')} />
                        </div>
                        <br />
                        <div id="TextField">
                        <TextField 
                            type="text" 
                            label="USER NAME" 
                            value={userToAdd.username}
                            onChange={(event) => this.handleNewUser(event, 'username')} />
                    </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="password" 
                                label="password" 
                                value={userToAdd.password} 
                                onChange={(event) => this.handleNewUser(event, 'password')}
                            />
                        </div>
                        <br />
                        <div id="TextField">
                        <TextField type="tel" 
                            label="PHONE" 
                            value={userToAdd.phone}
                            onChange={(event) => this.handleNewUser(event, 'phone')} />
                        </div>
                        <br />
                        <div id="Button">
                            <Button variant="contained" onClick={this.submitBtn}>ADD USER</Button>
                        </div>
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