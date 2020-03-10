import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addStudent(action) {
    
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.post('/api/addStudent', action.payload, config);
        console.log('action.payload from post saga addstudent', action.payload)

        yield put({ type: 'SET_STUDENTS', payload: response.data });
        

    } catch (error) {
        console.log('add student post request failed in saga', error);
    }
}

function* addStudentSaga() {
    yield takeLatest('SUBMIT_STUDENT', addStudent);
}

export default addStudentSaga;