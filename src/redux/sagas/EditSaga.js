import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* editUserInfo(action) {
    console.log('editUserInfo Saga', action.payload);
    let id = action.payload.id
    try{
        let response = yield axios.put(`/api/edit/${id}`, action.payload)
        console.log('editUserInfo Saga response', response.data);
    }catch(error) {
        console.log('error in editUserInfo Saga', error)
    }
};

function* editSaga(){
    yield takeLatest('EDIT_USERINFO', editUserInfo)
}

export default editSaga;