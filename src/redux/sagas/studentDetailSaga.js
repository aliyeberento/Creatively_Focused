import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* StudentDetailSaga() {
    yield takeLatest('GET_STUDENT_DETAIL', getDetail);
}

// this saga dispatches a GET to the server for a targeted item in the database
// afterward it sets that item for the details view
function* getDetail(action) {
    let response = yield axios.get(`/api/studentList/${action.payload}`);
    yield put({type: 'SET_STUDENT', payload: response.data[0]})
}

export default StudentDetailSaga;