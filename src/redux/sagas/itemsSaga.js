import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchItems(action) {
    try {
        //GET ITEMS FROM SERVER
        const response = yield axios.get(`/api/additem/${action.payload.id}`);
        //SEND TO REDUX
        console.log('itemSaga response:', response.data)
        //PLACE IN DISPATCH
        yield put({
            type: 'SET_ITEMS',
            payload: response.data
        });
    } catch (error) {
        console.log('Items GET request failed', error)
    }
}

function* addItem(action) {
    // console.log('in itemSaga')
    try {
        //  passes item from payload to server
        yield axios.post('/api/additem', action.payload);
        // console.log('addItem post', action.payload)
        // yield put({
        //     type: 'FETCH_ITEMS', -- NEED TO START THE GET TO REFRESH THE PAGE
        // });
    } catch (error) {
        console.log('Error with create event', error);
    }
}

function* itemsSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems)
    yield takeLatest('ADD_ITEM', addItem);
    
}

export default itemsSaga;