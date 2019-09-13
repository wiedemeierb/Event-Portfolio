import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createEvent(action) {
    try {
        //  passes created event from payload to server
        yield axios.post('/api/event/createevent', action.payload); 

        yield put({
            type: 'FETCH_USEREVENTS'})

    }catch(error) {
        console.log('Error with create event', error);
    }
}
function* createEventSaga() {
    yield takeLatest('CREATE_EVENT', createEvent);
}

export default createEventSaga;