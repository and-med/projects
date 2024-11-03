import * as actionTypes from './actionTypes';
import { createPayloadActionCreator, createErrorActionCreator } from '../../utils/actions';

export const fetchNotices = () => ({ type: actionTypes.FETCH_NOTICES });

export const fetchNoticesStart = () => ({ type: actionTypes.FETCH_NOTICES_START });

export const fetchNoticesFail = createErrorActionCreator(actionTypes.FETCH_NOTICES_FAIL);

export const fetchNoticesSuccess = createPayloadActionCreator(actionTypes.FETCH_NOTICES_SUCCESS);

export const createNoticeRedirect = createPayloadActionCreator(actionTypes.CREATE_NOTICE_REDIRECT);

export const createNotice = createPayloadActionCreator(actionTypes.CREATE_NOTICE);

export const createNoticeStart = () => ({ type: actionTypes.CREATE_NOTICE_START });

export const createNoticeFail = createErrorActionCreator(actionTypes.CREATE_NOTICE_FAIL);

export const createNoticeSuccess = createPayloadActionCreator(actionTypes.CREATE_NOTICE_SUCCESS);

export const updateNoticeTitle = createPayloadActionCreator(actionTypes.UPDATE_NOTICE_TITLE);

export const updateNoticeTitleStart = () => ({ type: actionTypes.UPDATE_NOTICE_TITLE_START });

export const updateNoticeTitleFail = createErrorActionCreator(actionTypes.UPDATE_NOTICE_TITLE_FAIL);

export const updateNoticeTitleSuccess = createPayloadActionCreator(actionTypes.UPDATE_NOTICE_TITLE_SUCCESS);

export const updateNotice = createPayloadActionCreator(actionTypes.UPDATE_NOTICE);

export const updateNoticeStart = () => ({ type: actionTypes.UPDATE_NOTICE_START });

export const updateNoticeFail = createErrorActionCreator(actionTypes.UPDATE_NOTICE_FAIL);

export const updateNoticeSuccess = createPayloadActionCreator(actionTypes.UPDATE_NOTICE_SUCCESS);

export const updateNoticeRedirect = createPayloadActionCreator(actionTypes.UPDATE_NOTICE_REDIRECT);

export const updateNoticeInit = createPayloadActionCreator(actionTypes.UPDATE_NOTICE_INIT);

export const deleteNoticeConfirm = createPayloadActionCreator(actionTypes.DELETE_NOTICE_CONFIRM);

export const deleteNoticeCancel = createPayloadActionCreator(actionTypes.DELETE_NOTICE_CANCEL);

export const deleteNotice = createPayloadActionCreator(actionTypes.DELETE_NOTICE);

export const deleteNoticeStart = () => ({ type: actionTypes.DELETE_NOTICE_START });

export const deleteNoticeFail = createErrorActionCreator(actionTypes.DELETE_NOTICE_FAIL);

export const deleteNoticeSuccess = createPayloadActionCreator(actionTypes.DELETE_NOTICE_SUCCESS);
