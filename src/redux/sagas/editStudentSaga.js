import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editStudentSaga() {
    yield takeLatest('EDIT_STUDENT', editStudent);
}

// this dispatches a PUT to the server
// updating a targeted row in the database
// afterward, it does a get to refresh the page
function* editStudent(action) {
    console.log('in editStudent generator', action);
    yield axios.put(`/api/studentList/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_STUDENTS' });
}

export default editStudentSaga;