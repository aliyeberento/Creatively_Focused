import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TaskListItem extends Component {

    goDetail = (event, task) => {
        console.log('clicking to see detail on task:', task);
        this.props.history.push(`/taskdetail/${task.id}`)
    }

    render() {
        return (
            <div>
                <li>
                    <p>{this.props.task.id}</p>
                    <button key={this.props.task.id} onClick={(event) => this.goDetail(event, this.props.task)}>view event details</button>
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

export default withRouter(connect(putReduxStateOnProps)(TaskListItem));