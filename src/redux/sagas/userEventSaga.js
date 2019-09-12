import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// DON'T NEED ACTION AFTER FETCH EVENT SINCE ITS A GET
function* fetchUserEvents() {
    try{
    //GET THE EVENT FROM OUR SERVER
    const response = yield axios.get(`/api/usereventpage`);
    //THEN, SEND TO REDUX
    // console.log('saga response!', response.data)
    // PUT IS DISPATCH
    yield put({
        type: 'SET_USEREVENTS', 
        payload: response.data
    });
    } catch (err) {
        console.log('User Event get request failed', err);
    }
}

function* removeEvent(action) {
    try{
        // console.log('this is the delete payload', action.payload);
        let id = action.payload.id
        console.log(id);

        yield axios.delete(`/api/usereventpage/${id}`, {user_id: action.payload})
        yield put({
            type: 'FETCH_USEREVENTS',
        })
    }catch (error) {
        console.log(error);
    }
}

function* userEventSaga() {
    yield takeLatest('FETCH_USEREVENTS', fetchUserEvents);
    yield takeLatest('DELETE_EVENT', removeEvent);
}

export default userEventSaga;