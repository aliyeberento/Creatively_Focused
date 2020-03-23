import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserItem from '../UserItem/UserItem';
import { Link } from 'react-router-dom';

//styling
import './UserList.css';

class UserList extends Component {

    render() {
        console.log(this.props.reduxState.teacher);
        return (
            <div>
                <ul>
                    <h1>USER LIST</h1>
                    <Link style={{ backgroundColor: 'transparent' }} className="connectorLink" to="/adminform">
                        <div id="Button">
                            <button className="linkBtn user-add" >
                                ADD NEW USER
                            </button>
                        </div>
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