import { put, call, select } from 'redux-saga/effects';

import * as actions from '../actions';
import normalize from '../normalize/directories';
import axios from '../../axios';
import { getDirectoryIdsAffectedByDelete, getRootDirId, getSelectedDirId } from '../selectors/directories';

export function * fetchDirectories() {
    try {
        yield put(actions.fetchDirectoriesStart());
        const response = yield call([axios, 'get'], '/directories');
        const normalizedResponse = yield call(normalize, response.data);
        yield put(actions.fetchDirectoriesSuccess(normalizedResponse));
    } catch (error) {
        yield put(actions.fetchDirectoriesFail(error));
    }
}

export function * createDirectory(action) {
    try {
        yield put(actions.createDirectoryStart());
        const data = {
            name: action.payload.name,
            parentId: action.payload.parentId,
        };
        const response = yield call([axios, 'post'], '/directories', data);
        yield put(actions.createDirectorySuccess(response.data));
        yield put(actions.triggerCreatePreviewOff({
            id: action.payload.parentId,
            parentId: action.payload.parentParentId,
        }));
    } catch (error) {
        yield put(actions.createDirectoryFail(error));
    }
}

export function * editDirectory({ payload: { id, name, parentId }}) {
    try {
        yield put(actions.editDirectoryStart());
        const data = { id, name, parentId };
        const response = yield call([axios, 'put'], `/directories/${id}`, data);
        yield put(actions.editDirectorySuccess(response.data));
        yield put(actions.triggerEditPreviewOff({ id, parentId }));
    } catch (error) {
        yield put(actions.createDirectoryFail(error));
    }
}

export function * deleteDirectory({ payload: { id, parentId }}) {
    try {
        yield put(actions.deleteDirectoryStart());
        yield call([axios, 'delete'], `/directories/${id}`);
        const directoriesToDelete = yield select(getDirectoryIdsAffectedByDelete);
        yield put(actions.deleteDirectorySuccess({ id, parentId, directoriesToDelete }));
        yield put(actions.deleteDirectoryCancel({ id, parentId }));
    } catch (error) {
        yield put(actions.deleteDirectoryFail(error));
    }
}

export function * directoriesRedirect({ payload: { redirect }}) {
    const selectedDirId = yield select(getSelectedDirId);
    yield call(redirect, `/directories/${selectedDirId}`);
}

export function * directoryClick({ payload: { id, parentId, redirect }}) {
    yield call(redirect, `/directories/${id}`);
    const rootId = yield select(getRootDirId);
    yield put(actions.selectDirectory({ id, parentId }));
    if (id !== rootId) {
        yield put(actions.triggerDirectoryFold({ id, parentId }));
    }
}
