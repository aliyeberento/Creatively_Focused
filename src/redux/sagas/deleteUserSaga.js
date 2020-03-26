import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteUser(action) {
    console.log(action);
    try {
        let id = action.payload
        let response = yield axios.delete(`/api/teacherList/${id}`);
        yield put({ type: 'GET_TEACHERS' })
    }
    catch (error) {
        console.log('Error in delete user saga', error)
    }
}

function* deleteUserSaga() {
    yield takeLatest('DELETE_USER', deleteUser);
}

export default deleteUserSaga;