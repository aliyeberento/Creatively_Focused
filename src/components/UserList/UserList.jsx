import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserItem from '../UserItem/UserItem';

class UserList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TEACHERS'
        })
    }

    render() {
        console.log(this.props.reduxState.teachers);
        return (
            <div>
                <ul>
                    {this.props.reduxState.teacher.map(teacher => {
                        return <UserItem key={teacher.id} teacher={teacher} />
                    })}
                </ul>
            </div>
        )
    }
}

const putStateOnProps = (reduxState) => {
    return ({
        reduxState
    })
}

export default connect(putStateOnProps)(UserList);