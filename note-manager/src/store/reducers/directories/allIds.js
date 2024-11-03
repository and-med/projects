import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = [];

const fetchDirectoriesSuccess = (state, action) => {
    return action.payload.allIds;
};

const createDirectorySuccess = (state, action) => {
    return [ ...state, action.payload.id ];
};

const deleteDirectorySuccess = (state, { payload: { directoriesToDelete }}) => {
    return state.filter(dirId => !directoriesToDelete.includes(dirId));
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_DIRECTORIES_SUCCESS]: fetchDirectoriesSuccess,
    [actionTypes.CREATE_DIRECTORY_SUCCESS]: createDirectorySuccess,
    [actionTypes.DELETE_DIRECTORY_SUCCESS]: deleteDirectorySuccess,
});

export default reducer;
