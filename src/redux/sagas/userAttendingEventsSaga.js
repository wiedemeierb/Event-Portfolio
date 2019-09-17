import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserAttendingEvents(action){
    try{
        const response = yield axios.get(`/api/userattendingevents/${action.payload}`)
        console.log('userAttendingEventsSaga response:', response.data)
        yield put({
            type: 'SET_USER_ATTENDING_EVENTS',
            payload: response.data
        });
    }catch(error) {
        console.log('userAttendingEventsSaga GET request failed', error);
    }}

function* userAttendingEventsSaga() {
    yield takeLatest('FETCH_USER_ATTENDING_EVENTS', fetchUserAttendingEvents)
}

export default userAttendingEventsSaga;