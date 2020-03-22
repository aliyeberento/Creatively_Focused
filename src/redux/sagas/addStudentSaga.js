import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* addStudent(action) {
    
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //response is all data being sent from the dom 
        //sending to database
        const response = yield axios.post('/api/addStudent', action.payload, config);
        console.log('action.payload from post saga addstudent', action.payload)
        yield put({ type: 'ADD_EVENTS' });
        yield put({ type: 'GET_STUDENTS', payload: response.data });
        yield put({ type: 'GET_STUDENTEVENT' });

    } catch (error) {
        console.log('add student post request failed in saga', error);
    }
}

function* addEvents() {
    console.log('in addEvents generator, addStudent saga');
    
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        //response is all data being sent from the dom 
        //sending to database
        const response = yield axios.post('/api/studentEvent');
        yield put({ type: 'GET_STUDENTEVENTS', payload: response.data });
    } catch (error) {
        console.log('add student post request failed in saga', error);
    }
}

function* addStudentSaga() {
    yield takeLatest('SUBMIT_STUDENT', addStudent);
    yield takeLatest('ADD_EVENTS', addEvents);
}

export default addStudentSaga;