import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TaskListItem from '../TaskListItem/TaskListItem';

class TaskList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TASKS'
        })
    }

    render() {
        let selectedStudentTasks = 
        this.props.reduxState.studentEvent.filter(task => task.student_id == this.props.match.params.id)
        console.log(this.props.reduxState.studentEvent);
        console.log(this.props.match.params.id);
        console.log(selectedStudentTasks);
        return (
            <div>
                <ul>
                    <h3>UPCOMING DEADLINES</h3>
                    {JSON.stringify(selectedStudentTasks)}
                    <TaskListItem key={selectedStudentTasks.id} task={selectedStudentTasks} />
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

export default withRouter(connect(putStateOnProps)(TaskList));