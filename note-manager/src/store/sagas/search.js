import { call } from 'redux-saga/effects';

export function * noticePreviewRedirect({ payload: { noticeId, redirect }}) {
    yield call(redirect, `search/notice/${noticeId}`);
}
