import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user.css';
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import {Calendar, momentLocalizer,} from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import TaskList from '../TaskList/TaskList';
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

// import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

// this page needs access to redux on props,
// a local state that holds the logged-in user's info
// and an editUser function that updates local state,
// then dispatches local state to the database to update it

class UserPage extends Component {

  state = {
    user: {
      // this is where the user's info is held locally
    },
    events: [
     // this is the student's iep and evals from database
    ],
    complete: false, // marked complete default false - changes to true in db
    
  }

  // componentDidMount() {
  //   this.props.dispatch({ type: 'GET_STUDENTEVENT' });
  // }

  onChange = (date) => {
    this.setState({ date });
    console.log('on change triggered')
  }
  
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(this.state.complete)
  };

  editUser = () => {
    console.log('editing THIS user:', this.props.user.username); 

  }

  formatEventsForCalendar = (studentEvents) => {
    console.log(studentEvents);
    let formatedStudentEvents = studentEvents.map(studentEvent => {
      // if (new Date(studentEvent.date) == new Date(2020-03-01)) {
      //   return {
      //     start: new Date(studentEvent.date),
      //     end: new Date(studentEvent.date),
      //     title: studentEvent.task
      //   }
      // }
      return {
        start: new Date(studentEvent.next_iep,), 
        end: new Date(studentEvent.next_iep),
        title: `${studentEvent.firstname}'s IEP`
      }

    });
    
   return formatedStudentEvents;
  }

  render() {

    let events = this.formatEventsForCalendar(this.props.student)
      // format dates for cal
      // make events here?

    return (
      <div className="welcome">
        <h1 >
          Welcome, {this.props.user.username}!
        </h1>
      
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: "100vh" }}
        />
        {/* CURRENT CALENDAR WEEKDAYS INACCURATE */}
        {/* THIS MIGHT BE REPLACEABLE WITH THE TASKLIST COMPONENT */}
        
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Next IEP</TableCell>
              <TableCell>Next Eval</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mark Completed</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.student.map(event => (
            <TableRow key={event.id}>
              
              <TableCell><Moment format="MM-D-YYYY">{event.next_iep}</Moment></TableCell>
              <TableCell><Moment format="MM-D-YYYY">{event.next_eval}</Moment></TableCell>
              <TableCell>{event.firstname}</TableCell>
              <TableCell>{event.lastname}</TableCell>
              <TableCell>
                <div>
                <Checkbox
                  checked={this.state.checkedB}
                  onChange={this.handleChange('complete')}
                  value="complete"
                  color="primary"
                />
              </div>
              </TableCell>
              <TableCell>{event.notes}</TableCell>
            </TableRow>
          )
          )}
          </TableBody>
        </Table>
    
        {/* <button onClick={this.editUser}>EDIT USER PROFILE</button> */}

        {/* <TaskList /> */}
        {/* <LogOutButton className="log-in" /> */}

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