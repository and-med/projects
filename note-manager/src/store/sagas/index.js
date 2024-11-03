import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    fetchDirectories,
    createDirectory,
    editDirectory,
    deleteDirectory,
    directoriesRedirect,
    directoryClick,
} from './directories';
import {
    fetchNotices,
    createNotice,
    updateNoticeTitle,
    createNoticeRedirect,
    updateNoticeRedirect,
    updateNotice,
    deleteNotice,
} from './notices';
import { noticePreviewRedirect } from './search';

export function * watchDirectories() {
    yield takeEvery(actionTypes.FETCH_DIRECTORIES, fetchDirectories);
    yield takeEvery(actionTypes.CREATE_DIRECTORY, createDirectory);
    yield takeEvery(actionTypes.EDIT_DIRECTORY, editDirectory);
    yield takeEvery(actionTypes.DELETE_DIRECTORY, deleteDirectory);
    yield takeEvery(actionTypes.DIRECTORIES_REDIRECT, directoriesRedirect);
    yield takeEvery(actionTypes.DIRECTORY_CLICK, directoryClick);
}

export function * watchNotices() {
    yield takeEvery(actionTypes.FETCH_NOTICES, fetchNotices);
    yield takeEvery(actionTypes.CREATE_NOTICE, createNotice);
    yield takeEvery(actionTypes.UPDATE_NOTICE, updateNotice);
    yield takeEvery(actionTypes.DELETE_NOTICE, deleteNotice);
    yield takeEvery(actionTypes.UPDATE_NOTICE_TITLE, updateNoticeTitle);
    yield takeEvery(actionTypes.CREATE_NOTICE_REDIRECT, createNoticeRedirect);
    yield takeEvery(actionTypes.UPDATE_NOTICE_REDIRECT, updateNoticeRedirect);
}

export function * watchSearch() {
    yield takeEvery(actionTypes.NOTICE_PREVIEW_REDIRECT, noticePreviewRedirect);
}
