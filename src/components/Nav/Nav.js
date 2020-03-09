import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';


class Nav extends Component {
  render() {
    return (
      <Menu>
        <div >
          <h2 >CREATIVELY FOCUSED</h2>
          <Link to="/home"> </Link>
          <div >
            {/* Show this link if they are logged in or not,
       but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
            {/* {this.props.store.user.id ? 'USER PROFILE' : 'LOGIN'} */}
            {this.props.store.user.id < 3 && (
              <>
                <Link className="menu-item" to="/adminhome">
                  TEACHER LIST
          </Link>
                <Link className="menu-item" to="/adminform">
                  ADD NEW USER
          </Link>
              </>
            )}
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {this.props.store.user.id && (
              <>
                {/* <Link className="nav-link" to="/info">
          INFO PAGE
           </Link> */}
                <Link className="menu-item" to="/studentroster">
                  STUDENT LIST  </Link>
                <Link className="menu-item" to="/addstudent">
                  ADD NEW STUDENT      </Link>
                <LogOutButton className="menu-item" />
              </>
            )}
            {/* Always show this link since the about page is not protected */}
            <Link className="menu-item" to="/about">
              ABOUT </Link>
          </div>
        </div>
      </Menu>
    )
  }
}

const mapStateToProps = store => ({
  store,
});

export default connect(mapStateToProps)(Nav)

