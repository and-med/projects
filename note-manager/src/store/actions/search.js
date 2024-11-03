import * as actionTypes from './actionTypes';
import { createPayloadActionCreator } from '../../utils/actions';

export const search = createPayloadActionCreator(actionTypes.SEARCH);

export const switchToAdvancedSearch = () => ({ type: actionTypes.SWITCH_TO_ADVANCED_SEARCH });

export const switchToSimpleSearch = () => ({ type: actionTypes.SWITCH_TO_SIMPLE_SEARCH });

export const advancedSearchTitle = createPayloadActionCreator(actionTypes.ADVANCED_SEARCH_TITLE);

export const advancedSearchContent = createPayloadActionCreator(actionTypes.ADVANCED_SEARCH_CONTENT);

export const advancedSearchTags = createPayloadActionCreator(actionTypes.ADVANCED_SEARCH_TAGS);

export const noticePreviewRedirect = createPayloadActionCreator(actionTypes.NOTICE_PREVIEW_REDIRECT);

export const noticePreviewInit = createPayloadActionCreator(actionTypes.NOTICE_PREVIEW_INIT);
