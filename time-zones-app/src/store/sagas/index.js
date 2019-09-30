import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { 
    authUserSaga, 
    logoutStartSaga, 
    authTryAutoSignupSaga,
    registerUserSaga } from './auth';
import { 
    timeZonesGetSaga,
    timeZoneEditSaga,
    timeZoneLoadEditSaga,
    timeZoneDeleteSaga } from './timeZones';
import { 
    usersGetSaga,
    userEditSaga,
    userLoadEditSaga,
    userDeleteSaga } from './users';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.LOGOUT_START, logoutStartSaga),
        takeEvery(actionTypes.AUTH_TRY_AUTO_SIGNUP, authTryAutoSignupSaga),
        takeEvery(actionTypes.REGISTER_USER, registerUserSaga)
    ]);
}

export function* watchTimeZones() {
    yield all([
        takeEvery(actionTypes.TIME_ZONES_GET, timeZonesGetSaga),
        takeEvery(actionTypes.TIME_ZONE_EDIT, timeZoneEditSaga),
        takeEvery(actionTypes.TIME_ZONE_LOADEDIT, timeZoneLoadEditSaga),
        takeEvery(actionTypes.TIME_ZONE_DELETE, timeZoneDeleteSaga)
    ]);
}

export function* watchUsers() {
    yield all([
        takeEvery(actionTypes.USERS_GET, usersGetSaga),
        takeEvery(actionTypes.USER_EDIT, userEditSaga),
        takeEvery(actionTypes.USER_LOADEDIT, userLoadEditSaga),
        takeEvery(actionTypes.USER_DELETE, userDeleteSaga)
    ]);
}