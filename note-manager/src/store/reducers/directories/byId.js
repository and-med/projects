import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';
import { removeKeysFromObject } from '../../../utils/immutableHelpers';

const initialState = {};

const fetchDirectoriesSuccess = (state, action) => {
    return action.payload.byId;
};

const updateDirectorySuccess = (state, action) => {
    return {
        ...state,
        [action.payload.id]: action.payload,
    };
};

const deleteDirectorySuccess = (state, { payload: { directoriesToDelete }}) => {
    return removeKeysFromObject(state, directoriesToDelete);
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_DIRECTORIES_SUCCESS]: fetchDirectoriesSuccess,
    [actionTypes.CREATE_DIRECTORY_SUCCESS]: updateDirectorySuccess,
    [actionTypes.EDIT_DIRECTORY_SUCCESS]: updateDirectorySuccess,
    [actionTypes.DELETE_DIRECTORY_SUCCESS]: deleteDirectorySuccess,
});

export default reducer;
