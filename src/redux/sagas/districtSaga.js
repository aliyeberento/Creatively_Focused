import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

function* districtSaga() {
    yield takeLatest('GET_DISTRICTS', getDistricts);
    yield takeLatest('ADD_DISTRICT', addDistrict);
}

function* getDistricts() {
    console.log('inside the get district saga')
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/isd', config);
        yield put({ type: 'SET_DISTRICTS', payload: response.data });
    } catch (error) {
        console.log('teacher get request failed in saga', error);
    }
}

function* addDistrict(action) {
console.log('inside the add district saga')
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //sending response to server to handle
        let response = yield axios.post('/api/isd', action.payload, config);
        yield put({ type: 'GET_DISTRICTS' });
    } catch (error) {
        console.log('add district post request failed in saga', error);
    }
}

export default districtSaga;