import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserItem extends Component {

    goDetail = (event, user) => {
        console.log('clicking to see detail on user:', user);
        this.props.history.push(`/admindetail/${user.id}`)
    }

    render() {
        return (
            <div>
                <li>
                    {this.props.teacher.username}
                    <button key={this.props.teacher.id} onClick={(event) => this.goDetail(event, this.props.teacher)}>view user details</button>
                </li>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(UserItem));