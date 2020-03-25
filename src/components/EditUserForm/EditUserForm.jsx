import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';


class EditUserForm extends Component {

    submitEdit = () => {
        // dispatches edit request to redux/database
        console.log('clicking to submit edit');
        this.props.dispatch({
            type: 'EDIT_USER',
            payload: this.props.reduxState.teacherDetail,
            url: `/api/teacherList/${this.props.reduxState.teacherDetail.id}`
        })
        this.goDetail();
    }

    goDetail = () => {
        // brings the user to a detail page showing all of
        // the information for the item they clicked on
        this.props.history.push(`/admindetail/${this.props.match.params.id}`)
    }

    updateUser = (event, propertyValue) => {
        // dispatch calls 'UPDATE_USER' which'll update 
        //the targeted property and send it to redux/database 
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: {
                key: [propertyValue],
                value: event.target.value
            }
        })
    }

    updateUserInt = (event, propertyValue) => {
        // dispatch calls 'UPDATE_USER' which'll update 
        //the targeted property and send it to redux/database 
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: {
                key: [propertyValue],
                value: Number(event.target.value)
            }
        });
    }

    render() {
        let user = this.props.reduxState.teacherDetail;
        let school = this.props.reduxState.schoolReducer;
        let district = this.props.reduxState.districtReducer;
        console.log(user);
        
        return (
            <div>
                <h1> EDIT USER</h1>
                <form id="AddForm">
                    {/* <label>First Name:
                        <input
                            type="text"
                            placeholder="firstname"
                            defaultValue={user.firstname}
                            onChange={(event) => this.updateUser(event, 'firstname')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="FIRST NAME" 
                            value={user.firstname}
                            defaultValue={user.firstname}
                            onChange={(event) => this.updateUser(event, 'firstname')} />
                    </div>
                    <br/>
                    {/* <label>Last Name:
                        <input
                            type="text"
                            placeholder="lastname"
                            defaultValue={user.lastname}
                            onChange={(event) => this.updateUser(event, 'lastname')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="LAST NAME" 
                            value={user.lastname}
                            defaultValue={user.lastname}
                            onChange={(event) => this.updateUser(event, 'lastname')} />
                    </div>
                    <br/>
                    {/* <label>Email/Username:
                        <input
                            type="text"
                            placeholder="username"
                            defaultValue={user.username}
                            onChange={(event) => this.updateUser(event, 'username')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="USERNAME" 
                            value={user.username}
                            defaultValue={user.username}
                            onChange={(event) => this.updateUser(event, 'username')} />
                    </div>
                    <br />
                    {/* <label>Mobile Phone Number:
                        <input
                            type="text"
                            placeholder="phone"
                            defaultValue={user.phone}
                            onChange={(event) => this.updateUser(event, 'phone')}
                        />
                    </label> */}
                    <div id="TextField">
                        <TextField 
                            type="tel" 
                            label="PHONE" 
                            value={user.phone}
                            defaultValue={user.phone}
                            onChange={(event) => this.updateUser(event, 'phone')} />
                    </div>
                    <br />
                    {/* <label>District:
                        <select 
                            name="isd" 
                            id="isd" 
                            defaultValue={user.isd} 
                            placeholder="isd" 
                            onChange={(event) => this.updateUserInt(event, 'isd')}>District:
                            <option>Choose one...</option>
                                {this.props.reduxState.districtReducer.map(isd => {
                                    return (
                                        <option value={isd.id} key={isd.id}>{isd.state} - {isd.isd}</option>
                                    )
                                })}
                            </select>
                            </label> */}
                    <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>DISTRICT</InputLabel>
                        <Select 
                            label="DISTRICT" 
                            name="district" 
                            id="district" 
                            value={user.isd}
                            // defaultValue={user.isd} 
                            placeholder="isd" 
                            onChange={(event) => this.updateUserInt(event, 'isd')}>
                                {district.map(district => {
                                    return (
                                        <MenuItem id="MenuItem" key={district.id} value={district.isd}>{district.state} - {district.city} - {district.isd}</MenuItem>
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
                            value={user.school}
                            // defaultValue={user.school} 
                            placeholder="school" 
                            onChange={(event) => this.updateUserInt(event, 'school')}>
                                {school.map(school => {
                                    return (
                                        <MenuItem id="MenuItem" key={school.id} value={school.id}>{school.name}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div>
                    {/* <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>SCHOOL</InputLabel>
                        <Select 
                            label="SCHOOL" 
                            name="SCHOOL" 
                            id="SCHOOL" 
                            value={this.props.reduxState.studentDetail.school}
                            defaultValue={this.props.reduxState.studentDetail.school}
                            placeholder="SCHOOL" 
                            onChange={(event) => this.updateStudentInt(event, 'school_id')}>
                                {this.props.reduxState.schoolReducer.map(school => {
                                    return (
                                        <MenuItem id="MenuItem" key={school.id} value={school.name}>
                                            {school.name}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div> */}
                        {/* <div id="TextField">
                        <FormControl style={{minWidth: 166}}>
                        <InputLabel>SCHOOL</InputLabel>
                        <Select 
                            label="SCHOOL" 
                            name="SCHOOL" 
                            id="SCHOOL" 
                            value={this.props.reduxState.studentDetail.school}
                            defaultValue={this.props.reduxState.studentDetail.school}
                            placeholder="SCHOOL" 
                            onChange={(event) => this.updateStudentInt(event, 'school_id')}>
                                {this.props.reduxState.schoolReducer.map(school => {
                                    return (
                                        <MenuItem id="MenuItem" key={school.id} value={school.name}>
                                            {school.name}</MenuItem>
                                    )
                                })}
                        </Select>
                        </FormControl>
                    </div> */}
                    
                        {/* <label>School:
                            <select name="school" id="school" defaultValue="school" placeholder="school" onChange={(event) => this.updateUserInt(event, 'school')}>
                                <option>Choose one...</option>
                                {this.props.reduxState.schoolReducer.map(school => {
                                    return (
                                        <option value={school.id} key={school.id}>{school.city} - {school.name} - {school.isd}</option>
                                    )
                                })}
                            </select>
                        </label> */}
                    {/* <label>School:
                        <select name="isd" onChange={(event) => this.updateUser(event, 'isd')}>
                            <option >Choose One...</option>
                            <option value="8">South High School</option>
                            <option value="7">Patrick Henry High School</option>
                            <option value="6">North High School</option>
                            <option value="5">Johnson High School</option>
                            <option value="4">Como</option>
                            <option value="3">Highland Park Middle School</option>
                            <option value="2">Farmington Junior High</option>
                            <option value="1">Farmington Senior High</option>
                        </select>
                    </label> */}
                    {/* <label>
                        Role/Auth:
                        <select name="role" onChange={(event) => this.updateUserInt(event, 'auth')}>
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
                        <InputLabel>ROLE/AUTH</InputLabel>
                        <Select 
                            label="AUTH" 
                            name="auth" 
                            id="auth" 
                            value={user.auth}
                            // defaultValue="auth" 
                            placeholder="auth" 
                            onChange={(event) => this.updateUserInt(event, 'auth')}>
                                <MenuItem id="MenuItem" value="3">Teacher</MenuItem>
                                <MenuItem id="MenuItem" value="2">School Principal</MenuItem>
                                <MenuItem id="MenuItem" value="1">Superintendent</MenuItem>
                                <MenuItem id="MenuItem" value="0">CF Admin</MenuItem>
                        </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div id="Button">
                        <Button variant="contained" onClick={this.submitEdit}>SUBMIT EDIT</Button>
                    </div>
                    {/* <button type="button" onClick={this.submitEdit}>submit changes</button> */}
                </form>
            </div >
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(EditUserForm));