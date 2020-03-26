import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import Checkbox from '@material-ui/core/Checkbox';


//styling
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// variables
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class TaskListItem extends Component {
    state = {
    complete: false,
    }

    goDetail = (event, task) => {
        console.log('clicking to see detail on task:', task);
        this.props.history.push(`/taskdetail/${task.id}`)
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });

    };

    render() {
        let task = this.props.task
        console.log(task);
        return (
            <div>
                return (
                    <div>
                        {/* <Table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mark Completed</TableCell>
                                    <TableCell>Date Due</TableCell>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Student Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {task.map(task => (
                                    // maps over studentsEvent reducer
                                    <TableRow key={task.id}>
                                        <TableCell>
                                            <Checkbox
                                                key={task.id}
                                                checked={this.state.checkedB}
                                                onChange={(e) => this.updateStudentEvent(e, task)}
                                                value="true"
                                                color="primary"
                                            /></TableCell>
                                        <TableCell><Moment format="MM-D-YYYY">{task.due_date}</Moment></TableCell>
                                        <TableCell>{task.task}</TableCell>
                                        <TableCell>{task.student_lastname}, {task.student_firstname}</TableCell>
                                    </TableRow>
                                )
                                )}
                            </TableBody>
                        </Table> */}
                    </div>
                )
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => {
    return {
        reduxState
    }
}

export default withStyles(styles)(withRouter(connect(putReduxStateOnProps)(TaskListItem)));