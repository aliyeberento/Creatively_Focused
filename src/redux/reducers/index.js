import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import teacher from './teacherReducer';

import studentEvent from './studentEventReducer';

import tasks from './tasksReducer';
import students from './studentReducer';
import studentDetail from  './studentDetailReducer';

import student from './studentReducer';
import teacherDetail from './teacherDetailReducer';
import districtReducer from './districtReducer';
import schoolReducer from './schoolReducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  teacher, // contains the teacher's information (school, username, contact preference)

  studentEvent, // dates for the deadlines

  tasks, // dates for the deadlines
  students, // student information
  studentDetail, // individual student for viewing and editing

  student, // student information
  teacherDetail,
  districtReducer,
  schoolReducer
});

export default rootReducer;
