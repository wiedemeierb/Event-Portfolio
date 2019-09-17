import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editUserInfo(action) {
    console.log('editUserInfo Saga', action.payload);
    let id = action.payload.id
    try{
        let response = yield axios.put(`/api/edit/${id}`, action.payload)
        console.log('editUserInfo Saga response', response.data);
        yield put({
            type: 'FETCH_USER',
            payload: response.data.id
        })
    }catch(error) {
        console.log('error in editUserInfo Saga', error)
    }
};

function* editSaga(){
    yield takeLatest('EDIT_USERINFO', editUserInfo)
}

export default editSaga;