import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';
import {
    toCountDictionary,
    decreaseCountDictionary,
} from '../../../utils/immutableHelpers';

const initialState = {};

const fetchNoticesSuccess = (state, { payload: { allIds, byId }}) => {
    const notices = allIds.map(id => byId[id]);
    const tags = notices.reduce((allTags, notice) => allTags.concat(notice.tags), []);
    return toCountDictionary(tags, {});
};

const createNoticeSuccess = (state, { payload: { tags }}) => {
    return toCountDictionary(tags, { ...state });
};

const deleteNoticeSuccess = (state, { payload: { tags }}) => {
    return decreaseCountDictionary(state, tags);
};

const upateNoticeSuccess = (state, { payload: { tags, oldTags }}) => {
    const noOldTags = decreaseCountDictionary(state, oldTags);
    return toCountDictionary(tags, noOldTags);
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_NOTICES_SUCCESS]: fetchNoticesSuccess,
    [actionTypes.CREATE_NOTICE_SUCCESS]: createNoticeSuccess,
    [actionTypes.DELETE_NOTICE_SUCCESS]: deleteNoticeSuccess,
    [actionTypes.UPDATE_NOTICE_SUCCESS]: upateNoticeSuccess,
});

export default reducer;
