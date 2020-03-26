import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

function* schoolSaga() {
    yield takeLatest('GET_SCHOOLS', getSchools);
    yield takeLatest('ADD_SCHOOL', addSchool)
}

function* getSchools() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/school', config);
        yield put({ type: 'SET_SCHOOLS', payload: response.data });
    } catch (error) {
        console.log('school get request failed in saga', error);
    }
}

function* addSchool(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //sending response to server to handle
        let response = yield axios.post('/api/school', action.payload, config);
        console.log('RESPONSE FROM ADD-SCHOOL-SAGA', response)
        yield put({ type: 'GET_SCHOOLS' });
    } catch (error) {
        console.log('add school post request failed in saga', error);
    }
}

export default schoolSaga;