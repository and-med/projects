import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axiosTimeZones from '../../axios/axiosTimeZones';

export function* timeZonesGetSaga(action) {
    yield put(actions.timeZonesGetStart());
    try {
        const response = yield axiosTimeZones.get('?diff=' + action.diff);
        yield put(actions.timeZonesGetSuccess(response.data));
    } catch (error) {
        console.log(error);
        yield put(actions.timeZonesGetFail(error.response.data));
    }
}