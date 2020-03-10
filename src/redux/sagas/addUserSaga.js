import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addUser(action) {
console.log('inside the add user saga')
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //sending response to server to handle
        let response = yield axios.post('/api/addUser', action.payload, config);
        console.log('RESPONSE FROM ADD-USER-SAGA', response)
    } catch (error) {
        console.log('add student post request failed in saga', error);
    }
}

function* addUserSaga() {
    yield takeLatest('ADD_USER', addUser);
}

export default addUserSaga;