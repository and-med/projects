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
    timeZoneLoadEditSaga } from './timeZones';

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
        takeEvery(actionTypes.TIME_ZONE_LOADEDIT, timeZoneLoadEditSaga)
    ]);
}