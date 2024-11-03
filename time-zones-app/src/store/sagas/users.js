import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axiosUsers from '../../axios/axiosUsers';

export function* usersGetSaga(action) {
    yield put(actions.usersGetStart());
    try {
        const response = yield axiosUsers.get();
        console.log(response);
        yield put(actions.usersGetSuccess(response.data));
    } catch (error) {
        yield put(actions.usersGetFail(error.response.data));
    }
}

export function* userEditSaga(action) {
    yield put(actions.userEditStart());
    try {
        let response = null;
        if (action.mode === 'create') {
            response = yield axiosUsers.post('', action.payload);
        } else if (action.mode) {
            response = yield axiosUsers.put('/' + action.id, action.payload);
        }
        yield put(actions.userEditSuccess(response));
    } catch (error) {
        yield put(actions.userEditFail(error.response.data));
    }
}

export function* userLoadEditSaga(action) {
    yield put(actions.userLoadEditStart());
    try {
        const response = yield axiosUsers.get('/' + action.id);
        yield put(actions.userLoadEditSuccess(response.data));
    } catch (error) {
        yield put(actions.userLoadEditFail(error.response.data));
    }
}

export function* userDeleteSaga(action) {
    yield put(actions.userDeleteStart());
    try {
        const response = yield axiosUsers.delete('/' + action.id);
        yield put(actions.userDeleteSuccess(response.data));
    } catch (error) {
        yield put(actions.userDeleteFail(error.response.data));
    }
}