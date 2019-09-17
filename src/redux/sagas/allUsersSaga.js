import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllUsers() {
    try{
        //GET ALL USERS FROM THE USER TABLE
        const response = yield axios.get(`/api/allusers`);
        //THEN SEND TO REDUX
        // console.log('allusers saga response', response.data)
        yield put({
            type: 'SET_ALLUSERS',
            payload: response.data
        })
    } catch (err) {
        console.log('GET ALL USERS REQUEST FAILED', err)
    }}

function* allUsersSaga() {
    yield takeLatest('FETCH_ALLUSERS', fetchAllUsers);
}

export default allUsersSaga;