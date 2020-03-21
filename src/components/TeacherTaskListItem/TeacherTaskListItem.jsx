import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class TaskListItem extends Component {

    render() {
        let task = this.props.task
        console.log(task);
        return (
            <div>
                {task.map(task => {
                    return (
                        <div>
                            <li>
                                {/* DUE DATE */}
                                {moment(task.due_date).format('MM-DD-YYYY')}<br />
                                {/* STUDENT NAME */}
                                {task.student_lastname}, {task.student_firstname}<br />
                                {/* TASK NAME */}
                                {task.task}</li>
                            <br />
                        </div>
                    )
                })}
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