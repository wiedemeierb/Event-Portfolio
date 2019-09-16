import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEvent(action) {
    try {
       
        // console.log('in fetchEventSaga')
        const response = yield axios.get(`/api/eventpage/${action.payload}`);
        // console.log('in GET eventSaga response', response.data)

        yield put({
            type: 'SET_EVENT',
            payload: response.data
        });
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* eventSaga() {
    yield takeLatest('FETCH_EVENT', fetchEvent);
}

export default eventSaga;