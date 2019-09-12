import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addItem(action) {
    console.log('in itemSaga')
    try {
        //  passes item from payload to server
        yield axios.post('/api/additem', action.payload);
        console.log('addItem post', action.payload)
    } catch (error) {
        console.log('Error with create event', error);
    }
}
function* itemSaga() {
    yield takeLatest('ADD_ITEM', addItem);
}

export default itemSaga;