import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllEventUsers(action){
    try{
        //GET ALL USERS FROM SERVER
        // console.log('in FETCHALLUSER EVENTS....', action.payload)
        const response = yield axios.get(`/api/addeventuser/${action.payload}`);
        //SEND TO REDUX
        // console.log('addEventUserSaga response:', response.data)
        //PLACE IN DISPATCH
        yield put({
            type: 'SET_ALLEVENTUSERS',
            payload: response.data
        });
    }catch(error) {
        console.log('AllEventUsers GET request failed', error)
    }
}

function* addEventUser(action) {
    // console.log('in addEventUserSaga')
    try {
        //passes user from payload to server
        yield axios.post(`/api/addeventuser`, action.payload);
        // console.log('addEventUser post', action.payload)
        yield put({
            type: 'FETCH_ALLEVENTUSERS',
            payload: action.payload.event_id
        });
    }catch(error) {
        console.log('Error with addEventUser POST in Saga', error);
    }};

function* addEventUserSaga() {
    yield takeLatest('FETCH_ALLEVENTUSERS', fetchAllEventUsers);
    yield takeLatest('ADD_EVENTUSER', addEventUser);
}

export default addEventUserSaga;