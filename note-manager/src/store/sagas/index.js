import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { fetchDirectories, createDirectory, editDirectory, deleteDirectory, directoriesRedirect } from './directories';
import { fetchNotices, createNotice, updateNoticeTitle, createNoticePreviewRedirect } from './notices';

export function * watchDirectories() {
    yield takeEvery(actionTypes.FETCH_DIRECTORIES, fetchDirectories);
    yield takeEvery(actionTypes.CREATE_DIRECTORY, createDirectory);
    yield takeEvery(actionTypes.EDIT_DIRECTORY, editDirectory);
    yield takeEvery(actionTypes.DELETE_DIRECTORY, deleteDirectory);
    yield takeEvery(actionTypes.DIRECTORIES_REDIRECT, directoriesRedirect);
}

export function * watchNotices() {
    yield takeEvery(actionTypes.FETCH_NOTICES, fetchNotices);
    yield takeEvery(actionTypes.CREATE_NOTICE, createNotice);
    yield takeEvery(actionTypes.UPDATE_NOTICE_TITLE, updateNoticeTitle);
    yield takeEvery(actionTypes.CREATE_NOTICE_REDIRECT, createNoticePreviewRedirect);
}
