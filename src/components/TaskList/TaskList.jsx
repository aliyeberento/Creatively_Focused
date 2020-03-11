import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskListItem from '../TaskListItem/TaskListItem';

class TaskList extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TASKS'
        })
    }

    render() {
        console.log(this.props.reduxState.tasks);
        return (
            <div>
                <ul>
                    <p>upcoming deadlines:</p>
                    {this.props.reduxState.tasks.map(task => {
                        return <TaskListItem key={task.id} task={task} />
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

export default connect(putStateOnProps)(TaskList);