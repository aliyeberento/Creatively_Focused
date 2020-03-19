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
                    <h3>UPCOMING DEADLINES</h3>
                    {this.props.reduxState.studentEvent.map(task => {
                        return <TaskListItem key={task.id} task={task} />
                    })}
                    {/* <li><input type="checkbox"></input>task #1</li>
                    <li><input type="checkbox"></input>task #2</li>
                    <li><input type="checkbox"></input>task #3</li> */}
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