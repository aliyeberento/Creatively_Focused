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
        this.goHome();
    }

    // when called brings the user back to the admin home page
    goHome = () => {
        this.props.history.push(`/adminhome`)
    }

    render() {
        let userToAdd = this.state.userToAdd
        if (this.props.store.user.auth === 0) {
            return (
                <div>
                    <h1>ADD NEW USER</h1>
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
                                onChange={(event) => this.handleNewUser(event, 'lastname')} 
                            />
                        </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="text" 
                                label="E-MAIL" 
                                value={userToAdd.username}
                                helperText="This will be the USERNAME"
                                onChange={(event) => this.handleNewUser(event, 'username')} 
                            />
                        </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="PASSWORD" 
                                label="PASSWORD" 
                                value={userToAdd.password} 
                                onChange={(event) => this.handleNewUser(event, 'password')}
                            />
                        </div>
                        <br />
                        <div id="TextField">
                            <TextField type="tel" 
                                label="PHONE" 
                                value={userToAdd.phone}
                                onChange={(event) => this.handleNewUser(event, 'phone')} 
                            />
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
                                    <MenuItem id="MenuItem" value="1">Superintendent</MenuItem>
                                    <MenuItem id="MenuItem" value="0">CF Admin</MenuItem>
                            </Select>
                            </FormControl>
                        </div>
                        <br />
                        <div id="TextField">
                            <FormControl style={{minWidth: 166}}>
                            <InputLabel>DISTRICT</InputLabel>
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
                            <InputLabel>SCHOOL</InputLabel>
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
        } else if (this.props.store.user.auth === 1) {
            return (
                <div>
                    <h1>ADD NEW USER</h1>
                    <form id="AddForm">
                        <div id="TextField">
                            <TextField 
                                type="text" 
                                label="FIRST NAME" 
                                value={userToAdd.firstname}
                                onChange={(event) => this.handleNewUser(event, 'firstname')} 
                            />
                        </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="text" 
                                label="LAST NAME" 
                                value={userToAdd.lastname}
                                onChange={(event) => this.handleNewUser(event, 'lastname')} 
                            />
                        </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="text" 
                                label="USER NAME" 
                                value={userToAdd.username}
                                onChange={(event) => this.handleNewUser(event, 'username')} 
                            />
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
                                onChange={(event) => this.handleNewUser(event, 'phone')} 
                            />
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
                    <h1>ADD NEW USER</h1>
                    <form id="AddForm">
                        <div id="TextField">
                            <TextField 
                                type="text" 
                                label="FIRST NAME" 
                                value={userToAdd.firstname}
                                onChange={(event) => this.handleNewUser(event, 'firstname')} 
                            />
                        </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="text" 
                                label="LAST NAME" 
                                value={userToAdd.lastname}
                                onChange={(event) => this.handleNewUser(event, 'lastname')} 
                            />
                        </div>
                        <br />
                        <div id="TextField">
                            <TextField 
                                type="text" 
                                label="USER NAME" 
                                value={userToAdd.username}
                                onChange={(event) => this.handleNewUser(event, 'username')} 
                            />
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
                                onChange={(event) => this.handleNewUser(event, 'phone')} 
                            />
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