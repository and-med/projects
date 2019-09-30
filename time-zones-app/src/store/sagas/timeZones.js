import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axiosTimeZones from '../../axios/axiosTimeZones';

export function* timeZonesGetSaga(action) {
    yield put(actions.timeZonesGetStart());
    try {
        const response = yield axiosTimeZones.get('?diff=' + action.diff);
        yield put(actions.timeZonesGetSuccess(response.data));
    } catch (error) {
        yield put(actions.timeZonesGetFail(error.response.data));
    }
}

export function* timeZoneEditSaga(action) {
    yield put(actions.timeZoneEditStart());
    try {
        let response = null;
        if (action.mode === 'create') {
            response = yield axiosTimeZones.post('', action.payload);
        } else if (action.mode) {
            response = yield axiosTimeZones.put('/' + action.id, action.payload);
        }
        yield put(actions.timeZoneEditSuccess(response));
    } catch (error) {
        yield put(actions.timeZoneEditFail(error.response.data));
    }
}

export function* timeZoneLoadEditSaga(action) {
    yield put(actions.timeZoneLoadEditStart());
    try {
        const response = yield axiosTimeZones.get('/' + action.id);
        yield put(actions.timeZoneLoadEditSuccess(response.data));
    } catch (error) {
        yield put(actions.timeZoneLoadEditFail(error.response.data));
    }
}