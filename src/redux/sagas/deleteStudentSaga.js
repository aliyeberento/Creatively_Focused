import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* deleteStudent(action) {
    console.log(action);
    try {
        let id = action.payload
        console.log(action.payload)
        let response = yield axios.delete(`/api/studentList/${id}`);
        yield put({ type: 'GET_STUDENT' })
        
    }
    catch (error) {
        console.log('Error in delete student saga', error)
    }
}


function* deleteStudentSaga() {
    yield takeLatest('DELETE_STUDENT', deleteStudent);
}

export default deleteStudentSaga;