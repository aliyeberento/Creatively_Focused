import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
    date: new Date(),
  
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_STUDENTEVENT' });
  }

  onChange = date => this.setState({ date })

  editUser = () => {
    console.log('editing THIS user:', this.props.user.username); 
  }

  render() {
    console.log(this.props.user.username);
    
    return (
      <div className="welcome">
        <h1 >
          Welcome, {this.props.user.username}!
        </h1>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <ul>
          {this.props.studentEvent.map((event) => {
            return <li key={event.id}>
              {event.task} {event.notes}
            </li>
          }
          )}
        </ul>
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