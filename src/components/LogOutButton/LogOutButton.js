import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// WE SHOULD FIND A WAY TO PUSH THIS TO '/home'

class LogOutButton extends Component {

  render() {
    return (
      <Link
        // This button shows up in multiple locations and is styled differently
        // because it's styled differently depending on where it is used, the className
        // is passed to it from it's parents through React props
        // className={this.props.reduxState.className}
        onClick={() => this.props.dispatch({ type: 'LOGOUT' })}
      >
        LOGOUT
      </Link>
    )
  }
}

const putReduxStateOnProps = (reduxState) => {
  return {
    reduxState
  }
}

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default withRouter(connect(putReduxStateOnProps)(LogOutButton));