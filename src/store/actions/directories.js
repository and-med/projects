import * as actionTypes from './actionTypes';
import { createPayloadActionCreator, createErrorActionCreator } from '../../utils/actions';

export const fetchDirectories = () => ({
    type: actionTypes.FETCH_DIRECTORIES,
});

export const fetchDirectoriesStart = () => ({
    type: actionTypes.FETCH_DIRECTORIES_START,
});

export const fetchDirectoriesFail = createErrorActionCreator(actionTypes.FETCH_DIRECTORIES_FAIL);

export const fetchDirectoriesSuccess = createPayloadActionCreator(actionTypes.FETCH_DIRECTORIES_SUCCESS);

export const createDirectoryPreview = createPayloadActionCreator(actionTypes.CREATE_DIRECTORY_PREVIEW);

export const triggerCreatePreviewOff = createPayloadActionCreator(actionTypes.TRIGGER_CREATE_PREVIEW_OFF);

export const createDirectory = createPayloadActionCreator(actionTypes.CREATE_DIRECTORY);

export const createDirectoryStart = () => ({
    type: actionTypes.CREATE_DIRECTORY_START,
});

export const createDirectoryFail = createErrorActionCreator(actionTypes.CREATE_DIRECTORY_FAIL);

export const createDirectorySuccess = createPayloadActionCreator(actionTypes.CREATE_DIRECTORY_SUCCESS);

export const editDirectoryPreview = createPayloadActionCreator(actionTypes.EDIT_DIRECTORY_PREVIEW);

export const triggerEditPreviewOff = createPayloadActionCreator(actionTypes.TRIGGER_EDIT_PREVIEW_OFF);

export const editDirectory = createPayloadActionCreator(actionTypes.EDIT_DIRECTORY);

export const editDirectoryStart = () => ({
    type: actionTypes.EDIT_DIRECTORY_START,
});

export const editDirectoryFail = createErrorActionCreator(actionTypes.EDIT_DIRECTORY_FAIL);

export const editDirectorySuccess = createPayloadActionCreator(actionTypes.EDIT_DIRECTORY_SUCCESS);

export const triggerDirectoryFold = createPayloadActionCreator(actionTypes.TRIGGER_DIRECTORY_FOLD);

export const directoryClick = createPayloadActionCreator(actionTypes.DIRECTORY_CLICK);

export const selectDirectory = createPayloadActionCreator(actionTypes.SELECT_DIRECTORY);

export const deleteDirectoryConfirm = createPayloadActionCreator(actionTypes.DELETE_DIRECTORY_CONFIRM);

export const deleteDirectoryCancel = createPayloadActionCreator(actionTypes.DELETE_DIRECTORY_CANCEL);

export const deleteDirectory = createPayloadActionCreator(actionTypes.DELETE_DIRECTORY);

export const deleteDirectoryStart = () => ({
    type: actionTypes.DELETE_DIRECTORY_START,
});

export const deleteDirectoryFail = createErrorActionCreator(actionTypes.DELETE_DIRECTORY_FAIL);

export const deleteDirectorySuccess = createPayloadActionCreator(actionTypes.DELETE_DIRECTORY_SUCCESS);

export const directoriesRedirect = createPayloadActionCreator(actionTypes.DIRECTORIES_REDIRECT);
