import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditUserForm extends Component {

    // state = {
    //     userToEdit: {
    //         id: this.props.reduxState.teacherDetail.id,
    //         username: this.props.reduxState.teacherDetail.username,
    //         phone: this.props.reduxState.teacherDetail.phone,
    //         school: this.props.reduxState.teacherDetail.school,
    //         isd: this.props.reduxState.teacherDetail.isd,
    //         // password: this.props.reduxState.teacherDetail.password
    //     }
    // }

    // editThisUser = (event, propertyValue) => {
    //     // build a new object in state
    //     console.log('building a new user', this.state.userToEdit);
    //     this.setState({
    //         userToEdit: {
    //             ...this.state.userToEdit,
    //             [propertyValue]: event.target.value,
    //         }
    //     })
    // }

    // submitEdit = () => {
    //     // dispatches edit to redux/database
    //     console.log('clicking to submit edit', this.state.userToEdit);
    //     this.props.dispatch({
    //         type: 'EDIT_USER',
    //         payload: this.state.userToEdit,
    //         url: `/api/teacherList/${this.state.userToEdit.id}`
    //     })
    //     this.goDetail();
    // }

    // goDetail = () => {
    //     // brings the user to a detail page showing all of
    //     // the information for the item they clicked on
    //     // console.log('clicking to go back to detail');
    //     this.props.history.push(`/admindetail/${this.props.reduxState.teacherDetail.id}`)
    //     // this.props.history.push(`/`)
    // }

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
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: {
                key: [propertyValue],
                value: event.target.value
            }
        })
    }

    render() {
        let user = this.props.reduxState.teacherDetail;
        return (
            <div>
                <h1> EDIT USER</h1>
                <form>
                    {/* ADD FIRST NAME */}
                    <label>First Name:
                        <input
                            type="text"
                            placeholder="firstname"
                            defaultValue={user.firstname}
                            onChange={(event) => this.updateUser(event, 'firstname')}
                        />
                    </label><br />
                    {/* ADD LAST NAME */}
                    <label>Last Name:
                        <input
                            type="text"
                            placeholder="lastname"
                            defaultValue={user.lastname}
                            onChange={(event) => this.updateUser(event, 'lastname')}
                        />
                    </label><br />
                    <label>Email/Username:
                        <input
                            type="text"
                            placeholder="username"
                            defaultValue={user.username}
                            onChange={(event) => this.updateUser(event, 'username')}
                        />
                    </label><br />
                    <label>Mobile Phone Number:
                        <input
                            type="text"
                            placeholder="phone"
                            defaultValue={user.phone}
                            onChange={(event) => this.updateUser(event, 'phone')}
                        />
                    </label><br />
                    {/* TURN THIS INTO A DROP DOWN */}
                    {/* <label>School:
                        <input
                            type="text"
                            placeholder="school"
                            defaultValue={user.school}
                            onChange={(event) => this.updateUser(event, 'school')}
                        />
                    </label><br /> */}
                    <label>
                    Independent School District:
                        <select name="school" onChange={(event) => this.updateUser(event, 'school')}>
                        <option >Choose One...</option>
                        <option value="3">Saint Paul, MN</option>
                        <option value="2">Mineapolis, MN</option>
                        <option value="1">Farmington, MN</option>
                    </select>
                </label>
                <br />
                <label>
                    School:
                        <select name="isd"
                        id="isd" 
                        defaultValue="isd" 
                        placeholder="isd"
                        onChange={(event) => this.updateUser(event, 'isd')}>
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
                </label>
                    {/* TURN THIS INTO A DROP DOWN */}
                    {/* <label>District:
                        <input
                            type="text"
                            placeholder="isd"
                            defaultValue={user.isd}
                            onChange={(event) => this.updateUser(event, 'isd')}
                        />
                    </label><br /> */}
                    {/* TURN THIS INTO A DROP DOWN */}
                    <label>Authorization Level:
                        <input
                            type="text"
                            placeholder="auth"
                            defaultValue={user.auth}
                            onChange={(event) => this.updateUser(event, 'auth')}
                        />
                    </label><br />
                    {/* <label>Username: <input type="text" label="username" defaultValue={user.username} value={user.username} onChange={(event) => this.editThisUser(event, 'username')}></input></label><br />
                    <label>Phone Number: <input type="text" label="phone" defaultValue={user.phone} value={user.phone} onChange={(event) => this.editThisUser(event, 'phone')}></input></label><br />
                    <label>School: <input type="text" label="school" defaultValue={user.school} value={user.school} onChange={(event) => this.editThisUser(event, 'school')}></input></label><br />
                    <label>ISD: <input type="text" label="isd" defaultValue={user.isd} value={user.isd} onChange={(event) => this.editThisUser(event, 'isd')}></input></label><br /> */}
                    <button type="button" onClick={this.submitEdit}>submit changes</button>
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