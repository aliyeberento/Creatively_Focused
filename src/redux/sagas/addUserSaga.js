import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';


function* addUser(action) {
console.log('inside the add user saga')
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        let response = yield axios.post('/api/addUser', action.payload, config);
        yield put({ type: 'GET_TEACHERS' });
    } catch (error) {
        console.log('add user post request failed in saga', error);
    }
}

function* addUserSaga() {
    yield takeLatest('ADD_USER', addUser);
}

export default addUserSaga;