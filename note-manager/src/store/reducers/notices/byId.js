import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {};

const fetchNoticesSuccess = (state, action) => {
    return action.payload.byId;
};

const createNoticeSuccess = (state, action) => {
    return {
        ...state,
        [action.payload.id]: action.payload,
    };
};

const updateNoticeTitleSuccess = (state, { payload: { id, title }}) => {
    return {
        ...state,
        [id]: {
            ...state[id],
            title: title,
        },
    };
};

const updateNoticeSuccess = (state, { payload: { id, title, description, tags }}) => {
    return {
        ...state,
        [id]: {
            ...state[id],
            title: title,
            description: description,
            tags: tags,
        },
    };
};

const deleteNoticeSuccess = (state, { payload: { id }}) => {
    return {
        ...state,
        [id]: undefined,
    };
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_NOTICES_SUCCESS]: fetchNoticesSuccess,
    [actionTypes.CREATE_NOTICE_SUCCESS]: createNoticeSuccess,
    [actionTypes.UPDATE_NOTICE_TITLE_SUCCESS]: updateNoticeTitleSuccess,
    [actionTypes.UPDATE_NOTICE_SUCCESS]: updateNoticeSuccess,
    [actionTypes.DELETE_NOTICE_SUCCESS]: deleteNoticeSuccess,
});

export default reducer;
