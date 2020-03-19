import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTasks() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/studentEvent', config);
        yield put({ type: 'SET_TASKS', payload: response.data });
    } catch (error) {
        console.log('task get request failed in saga', error);
    }
}

function* tasksSaga() {
    yield takeLatest('GET_TASKS', getTasks);
}

export default tasksSaga;