import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import createEventSaga from './createEventSaga';
import userEventSaga from './userEventSaga';
import allUsersSaga from './allUsersSaga';
import eventSaga from './eventSaga';
import addItem from './itemSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    createEventSaga(),
    userEventSaga(),
    allUsersSaga(),
    eventSaga(),
    addItem(),
  ]);
}
