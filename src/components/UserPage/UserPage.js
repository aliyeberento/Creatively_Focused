import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user.css';
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import { Calendar, momentLocalizer, } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-calendar/dist/Calendar.css';
import Checkbox from '@material-ui/core/Checkbox';

// styling
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// variables
const localizer = momentLocalizer(moment);
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

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

// this page needs access to redux on props,
// a local state that holds the logged-in user's info
// and an editUser function that updates local state,
// then dispatches local state to the database to update it

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_TEACHERS' });
    this.props.dispatch({ type: 'GET_STUDENTS' });
    this.props.dispatch({ type: 'GET_STUDENTEVENT' });
    this.props.dispatch({ type: 'GET_SCHOOLS' });
    this.props.dispatch({ type: 'GET_DISTRICTS' });
  }

  state = {
    user: {
      // this is where the user's info is held locally
    },
    complete: false, // marked complete default false - changes to true in db
    id: this.props.student
  }

  // changes checkboxes in task list to true
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });

  };

  updateStudentEvent = (e, propertyValue, id) => {
    // console.log('updating student event', event, propertyValue);
    console.log(id);
    // dispatch calls 'EDIT_STUDENTEVENT' which'll make a call to redux/database to edit an event
    this.props.dispatch({
      type: 'EDIT_STUDENTEVENT',
      payload: {
        key: propertyValue,
        value: 'true',
        id: id
      }
    })
  }

  formatEventsForCalendar = (studentEvents) => {
    // object that will have the amount of studentEvents within that month
    // jan = 0, dec = 11
    let year = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    };

    this.props.student.map(studentEvent => {
      // takes the index of year and increment studentEvent in that month
      year[moment(studentEvent.due_date).month()]++
    });
    // loops through studentEvents and turns it into an object for calendar
    let formatedStudentEvents = studentEvents.map(studentEvent => {

      // if the year's index is more than 3 change all events in that month
      if (year[moment(studentEvent.due_date).month()] > 3) {
        return {
          start: new Date(studentEvent.due_date),
          end: new Date(studentEvent.due_date),
          title: `⚠ ${studentEvent.student_firstname}'s ${studentEvent.task}`
        }
        // the standard object to return
      } else {
        return {
          start: new Date(studentEvent.due_date),
          end: new Date(studentEvent.due_date),
          title: `${studentEvent.student_firstname}'s ${studentEvent.task}`
        }
      }
    });
    //returns one of the objects
    return formatedStudentEvents;
  }

  render() {
    // sets the events for calendar using the student's dates
    let events = this.formatEventsForCalendar(this.props.student);    
    return (
      <div className="welcome">
        <h1>Welcome, Mr. Teacher!</h1>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "80vh", width: "100%" }}
        />
        <h3 id="h3">UPCOMING DEADLINES</h3>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Mark Completed</TableCell>
              <TableCell>Date Due</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Student Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.student.map(event => (
              // maps over studentsEvent reducer
              <TableRow key={event.id}>
                <TableCell>
                  <Checkbox
                    key={event.id}
                    checked={this.state.checkedB}
                    onChange={(e) => this.updateStudentEvent(e, event, event.id)}
                    value="true"
                    color="primary"
                  /></TableCell>
                <TableCell><Moment format="MM-D-YYYY">{event.due_date}</Moment></TableCell>
                <TableCell>{event.task}</TableCell>
                <TableCell>{event.student_lastname}, {event.student_firstname}</TableCell>
              </TableRow>
            )
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  student: state.studentEvent
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(UserPage));