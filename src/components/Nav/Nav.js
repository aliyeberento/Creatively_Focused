import React from 'react';
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/burgers">
        Burgers
      </a>

      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>

      <a className="menu-item" to="/adminhome">
        Desserts
      </a>
    </Menu>
  );
};
// const Nav = (props) => (
//   <div className="nav">
//     <Link to="/home">
//       <h2 className="nav-title">CREATIVELY FOCUSED</h2>
//     </Link>
//     <div className="nav-right">
//       <Link className="nav-link" to="/home">
//         {/* Show this link if they are logged in or not,
//         but call this link 'Home' if they are logged in,
//         and call this link 'Login / Register' if they are not */}
//         {props.user.id ? 'USER PROFILE' : 'LOGIN'}
//       </Link>
//       {props.user.id < 3 && (
//         <>
//           <Link className="nav-link" to="/adminhome">
//             TEACHER LIST
//           </Link>
//           <Link className="nav-link" to="/adminform">
//             ADD NEW USER
//           </Link>
//         </>
//       )}
//       {/* Show the link to the info page and the logout button if the user is logged in */}
//       {props.user.id && (
//         <>
//           {/* <Link className="nav-link" to="/info">
//             INFO PAGE
//           </Link> */}
//           <Link className="nav-link" to="/studentroster">
//             STUDENT LIST
//           </Link>
//           <Link className="nav-link" to="/addstudent">
//             ADD NEW STUDENT
//           </Link>
//           <LogOutButton className="nav-link"/>
//         </>
//       )}
//       {/* Always show this link since the about page is not protected */}
//       {/* <Link className="nav-link" to="/about">
//         ABOUT
//       </Link> */}
//     </div>
//   </div>
// );

// // Instead of taking everything from state, we just want the user
// // object to determine if they are logged in
// // if they are logged in, we show them a few more links 
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({ user }) => ({ user });
// const mapStateToProps = state => ({
//   user: state.user,
// });

// export default Nav;
