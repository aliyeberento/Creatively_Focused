import React, { Component } from 'react';
import { connect } from 'react-redux';

// import logo from './logo square color.jpg';
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";



class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form id="formContent">
              <h1>LOGIN</h1>
              <div id="TextField">
                <TextField 
                  type="text" 
                  label="username" 
                  value={this.state.username} 
                  onChange={this.handleInputChangeFor('username')} 
                />
              </div>
              <div id="TextField">
                <TextField 
                  type="password" 
                  label="password" 
                  value={this.state.password} 
                  onChange={this.handleInputChangeFor('password')} 
                />
              </div>
              <br />
              <div id="Button">
                <Button id="Button" variant="contained" onClick={this.login}>Log In</Button>
              </div>
            </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
