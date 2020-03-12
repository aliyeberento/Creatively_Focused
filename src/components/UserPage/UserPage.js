import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user.css';
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import {
  Calendar,
  momentLocalizer,
} from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);


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
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      },
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "new thing"
      }
    ],
    date: new Date(),
  
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_STUDENTEVENT' });
  }

  onChange = (date) => {
    this.setState({ date });
    console.log('on change triggered')
  }
  

  editUser = () => {
    console.log('editing THIS user:', this.props.user.username); 
  }

  render() {
    console.log(this.state.date);
    
    return (
      <div className="welcome">
        <h1 >
          Welcome, {this.props.user.username}!
        </h1>
        {/* <Calendar
          onChange={this.onChange}
          value={this.state.date}
        /> */}
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          onChange={this.onChange}
          value={this.onChange}
        />
        {console.log(this.state.events)}
        
        <table>
          <thead>
            <tr>
              <th>
                Task
                  </th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {this.props.studentEvent.map(event => (
            <tr key={event.id}>
              
              <td>{event.task}</td>
              <td>
                <Moment id="marker" format="MM-D-YYYY" >{event.date}</Moment>
                
              </td>
              
            </tr>
          )
          )}
          
          </tbody>
        </table>
        <h3 id="marker">!</h3>
        <button onClick={this.editUser}>EDIT USER PROFILE</button>
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
  studentEvent: state.studentEvent
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);