import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Checkbox from '@material-ui/core/Checkbox';

//styling
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
// import './TaskList.css';

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


class TeacherTaskList extends Component {

    state = {
        user: {
            // this is where the user's info is held locally
        },
        complete: false, // marked complete default false - changes to true in db
        id: this.props.reduxState.studentEvent
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_TASKS'
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });

    };

    updateStudentEvent = (e, event) => {
        this.props.dispatch({
            type: 'EDIT_STUDENTEVENT',
            payload: event
        })
    }

    render() {
        let selectedStudentTasks = 
        this.props.reduxState.studentEvent.filter(task => task.user_id == this.props.match.params.id)
        
        return (
            <div>
                <header>
                <Typography className="student-name" gutterBottom variant="h5" component="h2">
                    Upcoming Deadlines
                    </Typography>
                </header>
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mark Completed</TableCell>
                            <TableCell>Date Due</TableCell>
                            <TableCell>Task Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedStudentTasks.map(event => (
                            // maps over studentsEvent reducer
                            <TableRow key={event.id}>
                                <TableCell>
                                    <Checkbox
                                        key={event.id}
                                        checked={this.state.checkedB}
                                        onChange={(e) => this.updateStudentEvent(e, event)}
                                        value="true"
                                        color="primary"
                                    /></TableCell>
                                <TableCell><Moment format="MM-D-YYYY">{event.due_date}</Moment></TableCell>
                                <TableCell>{event.task}</TableCell>
                
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const putStateOnProps = (reduxState) => {
    return ({
        reduxState
    })
}

export default withRouter(connect(putStateOnProps)(TeacherTaskList));