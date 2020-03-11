import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditUserForm extends Component {

    state = {
        userToEdit: {
            id: this.props.reduxState.teacherDetail.id,
            username: this.props.reduxState.teacherDetail.username,
            // password: this.props.reduxState.teacherDetail.password
        }
    }

    

    editThisUser = (event, propertyValue) => {
        // build a new object in state
        console.log('building a new user', this.state.userToEdit);
        this.setState({
            userToEdit: {
                ...this.state.userToEdit,
                [propertyValue]: event.target.value,
            }
        })
    }

    submitEdit = () => {
        // dispatches edit to redux/database
        console.log('clicking to submit edit', this.state.userToEdit);
        this.props.dispatch({
            type: 'EDIT_USER',
            payload: this.state.userToEdit,
            url: `/api/teacherList/${this.state.userToEdit.id}`
        })
        this.goDetail();
    }

    goDetail = () => {
        // brings the user to a detail page showing all of
        // the information for the item they clicked on
        // console.log('clicking to go back to detail');
        this.props.history.push(`/admindetail/${this.props.reduxState.teacherDetail.id}`)
        // this.props.history.push(`/`)
    }

    render() {
        let user = this.state.userToEdit;
        return (
            <div>
                <form>
                    <input type="text" label="name" defaultValue={user.username} value={user.username} onChange={(event) => this.editThisUser(event, 'username')}></input>
                </form>
                <button onClick={this.submitEdit}>submit changes</button>
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