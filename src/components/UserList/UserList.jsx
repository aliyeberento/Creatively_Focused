import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserItem from '../UserItem/UserItem';
import { Link } from 'react-router-dom';


class UserList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TEACHERS'
        })
    }

    render() {
        console.log(this.props.reduxState.teacher);
        return (
            <div>
                <ul>
                <h1>USER LIST</h1>
                <Link className="connectorLink" to="/adminform">
                    <button className="linkBtn">
                        ADD NEW USER
                    </button>
                </Link>
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