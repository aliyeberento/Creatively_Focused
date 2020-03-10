import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getStudents() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get('api/studentList', config);
        yield put({ type: 'SET_STUDENTS', payload: response.data });
    } catch (error) {
        console.log('student get request failed in saga', error);
    }
}

function* studentListSaga() {
    yield takeLatest('GET_STUDENTS', getStudents);
}

export default studentListSaga;