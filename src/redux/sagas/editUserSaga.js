import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editUserSaga() {
    yield takeLatest('EDIT_USER', editUser);
}

// this dispatches a PUT to the server
// updating a targeted row in the database
// afterward, it does a get to refresh the page
function* editUser(action) {
    yield axios.put(`/api/teacherList/${action.payload.id}`, action.payload);
    yield put({ type: 'GET_TEACHERS' });
}

export default editUserSaga;