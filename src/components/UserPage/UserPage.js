import React, { Component } from 'react';
import { connect } from 'react-redux';
import './user.css';
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
    }
  }

  editUser = () => {
    console.log('editing THIS user:', this.props.reduxState.user.username); 
  }

  render() {
    console.log(this.props.reduxState.user.username);
    
    return (
      <div className="welcome">
        <h1 >
          Welcome, {this.props.reduxState.user.username}!
    </h1>
        <p >Your ID is: {this.props.reduxState.user.id}</p>
        <button onClick={this.editUser}>EDIT USER PROFILE</button>
        {/* <LogOutButton className="log-in" /> */}
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);