import React, { Component } from 'react';
import { stack as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

class Nav extends Component {

  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  closeMenu () {
    this.setState({menuOpen: false})
  }

  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  render() {
    return (
      <div id="outer-container">
        <Menu  pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } 
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
        right
        width={ 180 } >
        <main>
            <div className="menu-color">
              <Link className="menu-item" to="/home" onClick={() => this.closeMenu()}>HOME</Link>
              <br />
                {/* Show this link if they are logged in or not,
                but call this link 'Home' if they are logged in,
                and call this link 'Login / Register' if they are not */}
                {/* {this.props.store.user.id ? 'USER PROFILE' : 'LOGIN'} */}
                {/* Show this link ONLY to CF admins */}
                {this.props.store.user.auth < 1 && (
                  <>
                    <Link className="menu-item" to="/adddistrict" onClick={() => this.closeMenu()}>
                      ADD DISTRICT
                    </Link>
                    <br />
                    </>
                    )}
                    {/* Show these links to CF and ISD admins */}
                    {this.props.store.user.auth < 2 && (
                  <>
                    <Link className="menu-item" to="/addschool" onClick={() => this.closeMenu()}>
                      ADD SCHOOL
                    </Link>
                    <br />
                    </>
                    )}
                {this.props.store.user.auth < 3 && (
                  <>
                    <Link className="menu-item" to="/adminhome" onClick={() => this.closeMenu()}>
                      USER LIST
                    </Link>
                    <br />
                  </>
                )}
                {/* Show the link to the info page and the logout button to all users */}
                {this.props.store.user.auth < 5 && (
                  <>
                    <Link className="menu-item" to="/studentlist" onClick={() => this.closeMenu()}>
                      STUDENT LIST
                    </Link>
                    <br />
                    {/* THIS LOGOUT BUTTON SHOULD HAVE THE CLOSE MENU FUNCTION PASSED DOWN ON PROPS */}
                    <LogOutButton className="logoutButton" onClick={() => this.closeMenu()}/>
                  </>
                )}
            </div>
          </main>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
});

export default connect(mapStateToProps)(Nav)