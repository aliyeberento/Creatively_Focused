import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
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

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  render() {
    return (
      <div id="outer-container">
        <Menu  pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } 
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
        right>
        <main id="page-wrap">
            <div className="menu-color">
              <h2 className="nav-title">CREATIVELY FOCUSED</h2>
              <Link className="menu-item" to="/home" onClick={() => this.closeMenu()} onClick={() => this.closeMenu()}>HOME</Link>
              <br />
              <div >
                {/* Show this link if they are logged in or not,
            but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
                {/* {this.props.store.user.id ? 'USER PROFILE' : 'LOGIN'} */}
                {this.props.store.user.auth < 3 && (
                  <>
                    <Link className="menu-item" to="/adminhome" onClick={() => this.closeMenu()}>
                      TEACHER LIST
                    </Link>
                    <br />
                    {/* <Link className="menu-item" to="/adminform">
                  ADD NEW USER
                </Link>
                <br /> */}
                    {/* <LogOutButton className="menu-item" /> */}
                  </>
                )}
                {/* Show the link to the info page and the logout button if the user is logged in */}
                {this.props.store.user.auth < 5 && (
                  <>
                    <Link className="menu-item" to="/studentlist" onClick={() => this.closeMenu()}>
                      STUDENT LIST
                    </Link>
                    <br />
                    {/* <Link className="menu-item" to="/addstudent">
                  ADD NEW STUDENT
                  </Link>
                <br /> */}
                    <LogOutButton className="menu-item" onClick={() => this.closeMenu()}/>
                  </>
                )}
              </div>
            </div>
            {/* <main id="page-wrap"> */}
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