import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TaskDetailPage extends Component {

    // GET request for details of the item clicked on
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TASK_DETAIL',
            payload: this.props.match.params.id
        })
    }

    // directs the user to an edit page pre-populated with the task's info
    // editTask = () => {
    //     console.log('clicking to go edit', this.props.match.params.id);
    //     this.props.history.push(`/edittask/${this.props.match.params.id}`)
    // }

    // dispatches a DELETE to the database via redux saga for the item clicked on
    // deleteTask = () => {
    //     console.log('clicking to delete');
    //     this.props.dispatch({
    //         type: 'DELETE_TASK',
    //         payload: this.props.match.params.id
    //     })
    //     this.props.history.push(`/home`)
    // }

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