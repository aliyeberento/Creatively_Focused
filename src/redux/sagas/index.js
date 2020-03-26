import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import studentSaga from './studentSaga';
import teacherSaga from './teacherSaga';
import addStudentSaga from './addStudentSaga';
import addUserSaga from './addUserSaga'
import deleteStudentSaga from './deleteStudentSaga';
import studentEventSaga from './studentEventSaga';
import studentDetailSaga from './studentDetailSaga';
import editStudentSaga from './editStudentSaga';
import teacherDetailSaga from './teacherDetailSaga';
import editUserSaga from './editUserSaga';
import deleteUserSaga from './deleteUserSaga';
import tasksSaga from './tasksSaga';
import districtSaga from './districtSaga';
import schoolSaga from './schoolSaga';
import editStudentEventSaga from './editStudentEventSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    studentSaga(), //for getting student information 
    teacherSaga(), //for teacher information
    addStudentSaga(), // adds student info then saves to student reducer
    addUserSaga(),
    deleteStudentSaga(), // deletes by student id not school student id
    studentEventSaga(), // holds all of the student iep/eval dates
    studentDetailSaga(),
    editStudentSaga(),
    teacherDetailSaga(),
    editUserSaga(),
    deleteUserSaga(),
    tasksSaga(),
    districtSaga(),
    schoolSaga(),
    editStudentEventSaga()
  ]);
}
