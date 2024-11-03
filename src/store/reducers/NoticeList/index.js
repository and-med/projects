import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {
    isDeleting: false,
    deletingNoticeId: null,
};

const deleteNoticeConfirm = (state, { payload: { id }}) => {
    return {
        ...state,
        isDeleting: true,
        deletingNoticeId: id,
    };
};

const deleteNoticeCancel = (state, action) => {
    return {
        ...state,
        isDeleting: false,
        deletingNoticeId: null,
    };
};

const reducer = createReducer(initialState, {
    [actionTypes.DELETE_NOTICE_CONFIRM]: deleteNoticeConfirm,
    [actionTypes.DELETE_NOTICE_CANCEL]: deleteNoticeCancel,
});

export default reducer;
