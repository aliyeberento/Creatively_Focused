import React from 'react';
import {Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

// this is a custom router component that allows certain
//protected routes to only be visible to logged in admins
const AdminRoute = (props) => {
  const {
    // Alias prop 'component' as 'ComponentToProtect'
    component: ComponentToProtect,
    user,
    loginMode,
    ...otherProps
  } = props;
  
  let ComponentToShow;

  if(user.auth < 3) {
    // if the logged in user has the proper clearance level
    // show the component that is protected
    ComponentToShow = ComponentToProtect;
  } else if (loginMode === 'login') {
    // if they are not logged in, check the loginMode on Redux State
    // if the mode is 'login', show the LoginPage
    ComponentToShow = LoginPage;
  } else {
    // the the user is not logged in and the mode is not 'login'
    // show the RegisterPage
    ComponentToShow = RegisterPage;
  }

  // We return a Route component that gets added to our list of routes
  return (
      <Route
        // all props like 'exact' and 'path' that were passed in
        // are now passed along to the 'Route' Component
        {...otherProps}
        component={ComponentToShow}
      />
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loginMode: state.loginMode,
  }
}

export default withRouter(connect(mapStateToProps)(AdminRoute));