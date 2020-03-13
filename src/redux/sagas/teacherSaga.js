import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getTeacher() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/teacherList', config);
        yield put({ type: 'SET_TEACHERS', payload: response.data });
    } catch (error) {
        console.log('teacher get request failed in saga', error);
    }
}

function* teacherListSaga() {
    yield takeLatest('GET_TEACHERS', getTeacher);
}

export default teacherListSaga;