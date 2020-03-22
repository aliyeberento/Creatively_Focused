import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getStudentEvent() {
    console.log('IN GET STUDENT EVENT');
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/studentEvent', config);
        yield put({ type: 'SET_STUDENTEVENT', payload: response.data });
    } catch (error) {
        console.log('student event get request failed in saga', error);
    }
}

function* studentEventSaga() {
    yield takeLatest('GET_STUDENTEVENT', getStudentEvent);
}

export default studentEventSaga;