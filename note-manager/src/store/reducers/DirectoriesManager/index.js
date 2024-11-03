import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';
import {
    updateObject,
    updateArray,
    toLookup,
    firstOrDefault,
    addItemToArray,
    deleteItemsFromArray,
    removeKeysFromObject } from '../../../utils/immutableHelpers';

const initialState = {
    directoriesByParent: {},
    rootDirId: null,
    rootDirIsCreatingSubfolder: false,
    selectedDirectoryId: null,
    selectedDirectoryParentId: null,
    isDeleting: false,
};

const updateDirectoriesByParent = (state, id, parentId, newPropertiesProvider) => {
    const dirsOnSameLevel = state.directoriesByParent[parentId];

    const updatedArray = updateArray(dirsOnSameLevel,
        dir => dir.id === id,
        newPropertiesProvider);

    const updatedDirectoriesByParent = updateObject(state.directoriesByParent, {
        [parentId]: updatedArray,
    });

    return updateObject(state, {
        directoriesByParent: updatedDirectoriesByParent,
    });
};

const setIsCreatingSubfolder = (state, id, parentId, newProperties) => {
    if (id === state.rootDirId) {
        return updateObject(state, {
            rootDirIsCreatingSubfolder: newProperties.isCreatingSubfolder,
        });
    }

    return updateDirectoriesByParent(state, id, parentId, () => newProperties);
};

const fetchDirectoriesSuccess = (state, { payload: { allIds, byId }}) => {
    const directories = allIds.map(id => byId[id]);
    const rootDirId = firstOrDefault(
        directories,
        dir => !dir.parentId,
        dir => dir.id
    );

    return updateObject(state, {
        directoriesByParent: toLookup(
            directories.filter(dir => dir.parentId),
            dir => dir.parentId,
            dir => ({ id: dir.id, folded: true })
        ),
        rootDirId: rootDirId,
        selectedDirectoryId: rootDirId,
    });
};

const createDirectoryPreview = (state, action) => {
    return setIsCreatingSubfolder(state, state.selectedDirectoryId, state.selectedDirectoryParentId,
        { folded: false, isCreatingSubfolder: true });
};

const triggerCreatePreviewOff = (state, { payload: { id, parentId } }) => {
    return setIsCreatingSubfolder(state, id, parentId,
        { isCreatingSubfolder: false });
};

const createDirectorySuccess = (state, { payload: { id, parentId }}) => {
    const updatedArray = addItemToArray(
        state.directoriesByParent[parentId],
        { id: id, folded: true });

    return updateObject(state, {
        directoriesByParent: updateObject(state.directoriesByParent, {
            [parentId]: updatedArray,
        }),
    });
};

const triggerDirectoryFold = (state, { payload: { id, parentId } }) => {
    return updateDirectoriesByParent(state, id, parentId,
        dir => ({ folded: !dir.folded, isCreatingSubfolder: false }));
};

const selectDirectory = (state, { payload: { id, parentId } }) => {
    return updateObject(state, {
        selectedDirectoryId: id,
        selectedDirectoryParentId: parentId || null,
    });
};

const editDirectoryPreview = (state, action) => {
    return updateDirectoriesByParent(state, state.selectedDirectoryId, state.selectedDirectoryParentId,
        () => ({ isEditing: true }));
};

const triggerEditPreviewOff = (state, { payload: { id, parentId } }) => {
    return updateDirectoriesByParent(state, id, parentId,
        () => ({ isEditing: false }));
};

const deleteDirectoryConfirm = (state, action) => {
    return updateObject(state, {
        isDeleting: true,
    });
};

const deleteDirectoryCancel = (state, action) => {
    return updateObject(state, {
        isDeleting: false,
    });
};

const deleteDirectorySuccess = (state, { payload: { id, parentId, directoriesToDelete }}) => {
    const dirsOnSameLevel = state.directoriesByParent[parentId];

    let updatedDirectoriesByParent = removeKeysFromObject(state.directoriesByParent, directoriesToDelete);

    updatedDirectoriesByParent = updateObject(updatedDirectoriesByParent, {
        [parentId]: deleteItemsFromArray(dirsOnSameLevel, dir => dir.id === id),
    });

    return updateObject(state, {
        directoriesByParent: updatedDirectoriesByParent,
        selectedDirectoryId: state.rootDirId,
        selectedDirectoryParentId: null,
    });
};

export default createReducer(initialState, {
    [actionTypes.FETCH_DIRECTORIES_SUCCESS]: fetchDirectoriesSuccess,
    [actionTypes.TRIGGER_DIRECTORY_FOLD]: triggerDirectoryFold,
    [actionTypes.SELECT_DIRECTORY]: selectDirectory,
    [actionTypes.CREATE_DIRECTORY_PREVIEW]: createDirectoryPreview,
    [actionTypes.TRIGGER_CREATE_PREVIEW_OFF]: triggerCreatePreviewOff,
    [actionTypes.CREATE_DIRECTORY_SUCCESS]: createDirectorySuccess,
    [actionTypes.EDIT_DIRECTORY_PREVIEW]: editDirectoryPreview,
    [actionTypes.TRIGGER_EDIT_PREVIEW_OFF]: triggerEditPreviewOff,
    [actionTypes.DELETE_DIRECTORY_CONFIRM]: deleteDirectoryConfirm,
    [actionTypes.DELETE_DIRECTORY_CANCEL]: deleteDirectoryCancel,
    [actionTypes.DELETE_DIRECTORY_SUCCESS]: deleteDirectorySuccess,
});
