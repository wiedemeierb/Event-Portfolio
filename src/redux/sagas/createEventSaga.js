import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createEvent(action) {
    try {
        // clear any existing error on the registration page
        // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
        //  passes created event from payload to server
        yield axios.post('/api/event/createevent', action.payload); 
    }catch(error) {
        console.log('Error with create event', error);
        // yield put({type: 'REGISTRATION_FAILED'});
    }
}
function* createEventSaga() {
    yield takeLatest('CREATE_EVENT', createEvent);
}

export default createEventSaga;