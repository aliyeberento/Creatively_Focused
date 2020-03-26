import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// This component went unused during our project 
// but it may be useful in the future

class TaskDetailPage extends Component {

    // GET request for details of the item clicked on
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TASK_DETAIL',
            payload: this.props.match.params.id
        })
    }
    
    render() {
        let task = this.props.reduxState.taskDetail;
        return (
            <div>
                <h1>{task.id}</h1>
                <p>Date Due: {task.due_date}</p>
                <button onClick={this.editTask}>edit task</button><br />
                <button onClick={(event) => { if (window.confirm('are you sure you want to delete this task?')) this.deleteTask(event) }}>delete student</button>
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withRouter(connect(putReduxStateOnProps)(TaskDetailPage));