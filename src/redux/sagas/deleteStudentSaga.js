import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteStudent(action) {
    console.log(action);
    try {
        let id = action.payload
        console.log(action.payload)
        let response = yield axios.delete(`/api/studentList/${id}`);
        console.log(response,'THIS IS RESPONSE FROM DELETE STUDENT SAGA')
        yield put({ type: 'GET_STUDENTS' })
    }
    catch (error) {
        console.log('Error in delete student saga', error)
    }
}

function* deleteStudentEvents(action) {
    console.log(action);
    try {
        // let id = action.payload
        console.log(action.payload)
        let response = yield axios.delete(`/api/studentEvent`);
        console.log(response,'THIS IS RESPONSE FROM DELETE STUDENT SAGA');
        // yield put({ type: 'DELETE_STUDENT' })
    }
    catch (error) {
        console.log('Error in delete student saga', error)
    }
}


function* deleteStudentSaga() {
    yield takeLatest('DELETE_STUDENT_EVENTS', deleteStudentEvents);
    yield takeLatest('DELETE_STUDENT', deleteStudent);
}

export default deleteStudentSaga;