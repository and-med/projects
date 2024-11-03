import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {
    selectedNoteId: null,
    isEdit: false,
};

const updateNoticeInit = (state, { payload: { selectedNoteId, isEdit }}) => {
    const noteId = selectedNoteId ? +selectedNoteId : null;
    return {
        ...state,
        selectedNoteId: noteId,
        isEdit,
    };
};

const reducer = createReducer(initialState, {
    [actionTypes.UPDATE_NOTICE_INIT]: updateNoticeInit,
});

export default reducer;
