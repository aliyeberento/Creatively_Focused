import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class TaskListItem extends Component {

    goDetail = (event, task) => {
        console.log('clicking to see detail on task:', task);
        this.props.history.push(`/taskdetail/${task.id}`)
    }

    render() {
        let task = this.props.task
        console.log(task);
        return (
            <div>
                {task.map(task => {
                    return (
                        <div>
                            <li>{moment(task.due_date).format('MM-DD-YYYY')}</li>
                            {/* CHECKBOX */}
                            {/* <input type="checkbox"></input> */}
                            {/* DATE DUTE */}
                            {/* {moment(task.due_date).format('MM-DD-YYYY')}<br /> */}
                            {/* STUDENT NAME */}
                            {/* {task.lastname}, {task.firstname}<br /> */}
                            {/* TASK NAME */}
                            {/* {task.task} */}
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