import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = [];

const fetchNoticesSuccess = (state, action) => {
    return action.payload.allIds;
};

const createNoticeSuccess = (state, action) => {
    return [ ...state, action.payload.id ];
};

const deleteNoticeSuccess = (state, { payload: { id }}) => {
    return state.filter(noticeId => noticeId !== id);
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_NOTICES_SUCCESS]: fetchNoticesSuccess,
    [actionTypes.CREATE_NOTICE_SUCCESS]: createNoticeSuccess,
    [actionTypes.DELETE_NOTICE_SUCCESS]: deleteNoticeSuccess,
});

export default reducer;
