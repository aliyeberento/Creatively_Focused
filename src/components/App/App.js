import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import UserPage from '../UserPage/UserPage';
import StudentList from '../StudentList/StudentList';
import StudentDetailPage from '../StudentDetailPage/StudentDetailPage';
import AddStudentForm from '../AddStudentForm/AddStudentForm';
import EditStudentForm from '../EditStudentForm/EditStudentForm';
import AdminRoute from '../AdminRoute/AdminRoute';
import AddUserForm from '../AddUserForm/AddUserForm'
import UserList from '../UserList/UserList';
import UserDetailPage from '../UserDetailPage/UserDetailPage';
import EditUserForm from '../EditUserForm/EditUserForm';
import AddDistrictForm from '../AddDistrictForm/AddDistrictForm';
import AddSchoolForm from '../AddSchoolForm/AddSchoolForm';
import './App.css';
import TaskDetailPage from '../TaskDetailPage/TaskDetailPage';
import twilio from '../twilio/twilio'

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_TEACHERS' });
    this.props.dispatch({ type: 'GET_STUDENTS' });
    this.props.dispatch({ type: 'GET_STUDENTEVENT' });
    this.props.dispatch({ type: 'GET_SCHOOLS' });
    this.props.dispatch({ type: 'GET_DISTRICTS' });
  }

  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            <header className="nav-title" id="CFlogo">CREATIVELY FOCUSED</header>
          </div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            {/* <Route
              exact
              path="/about"
              component={AboutPage}
            /> */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            /> */}
            <AdminRoute
              exact
              path="/adminhome"
              component={UserList}
            />
            <AdminRoute
              exact
              path="/adminform"
              component={AddUserForm}
            />
            <AdminRoute
              exact
              path="/admindetail/:id"
              component={UserDetailPage}
            />
            <AdminRoute
              exact
              path="/edituser/:id"
              component={EditUserForm}
            />
            <AdminRoute
              exact
              path="/adddistrict"
              component={AddDistrictForm}
            />
            <AdminRoute
              exact
              path="/addschool"
              component={AddSchoolForm}
            />
            <ProtectedRoute
              exact
              path="/addstudent"
              component={AddStudentForm}
            />
            <ProtectedRoute
              exact
              path="/editstudent/:id"
              component={EditStudentForm}
            />
            <ProtectedRoute
              exact
              path="/studentdetail/:id"
              component={StudentDetailPage}
            />
            <ProtectedRoute
              exact
              path="/studentlist"
              component={StudentList}
            />
            <ProtectedRoute
              exact
              path="/taskdetail/:id"
              component={TaskDetailPage}
            />
            <ProtectedRoute
            exact
            path = "/twilio"
            component={twilio}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>Huh? Are you stupid? 404 dummy</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
