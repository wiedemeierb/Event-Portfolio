import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// DON'T NEED ACTION AFTER FETCH EVENT SINCE ITS A GET
function* fetchUserEvent() {
    try{
        //GET THE EVENT FROM OUR SERVER
    const response = yield axios.get(`/api/usereventpage`);
    //THEN, SEND TO REDUX
    console.log('saga response!', response.data)
    // PUT IS DISPATCH
    yield put({
        type: 'SET_USEREVENT', 
        payload: response.data
    });
    } catch (err) {
        console.log('User Event get request failed', err);
    }
}

function* userEventSaga() {
    yield takeLatest('FETCH_USEREVENT', fetchUserEvent);
}

export default userEventSaga;