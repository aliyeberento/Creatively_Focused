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
        // the targeted property and send it to redux/database 
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
        // the targeted property and send it to redux/database 
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
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="FIRST NAME" 
                            value={user.firstname}
                            defaultValue={user.firstname}
                            onChange={(event) => this.updateUser(event, 'firstname')} />
                    </div>
                    <br/>
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="LAST NAME" 
                            value={user.lastname}
                            defaultValue={user.lastname}
                            onChange={(event) => this.updateUser(event, 'lastname')} />
                    </div>
                    <br/>
                    <div id="TextField">
                        <TextField 
                            type="text" 
                            label="USERNAME" 
                            value={user.username}
                            defaultValue={user.username}
                            onChange={(event) => this.updateUser(event, 'username')} />
                    </div>
                    <br />
                    <div id="TextField">
                        <TextField 
                            type="tel" 
                            label="PHONE" 
                            value={user.phone}
                            defaultValue={user.phone}
                            onChange={(event) => this.updateUser(event, 'phone')} />
                    </div>
                    <br />
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