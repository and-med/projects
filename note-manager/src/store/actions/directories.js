import * as actionTypes from './actionTypes';

export const fetchDirectories = () => {
    return {
        type: actionTypes.FETCH_DIRECTORIES,
    };
};

export const fetchDirectoriesStart = () => {
    return {
        type: actionTypes.FETCH_DIRECTORIES_START,
    };
};

export const fetchDirectoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_DIRECTORIES_FAIL,
        error: error,
    };
};

export const fetchDirectoriesSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_DIRECTORIES_SUCCESS,
        payload: payload,
    };
};

export const createDirectory = (directory) => {
    return {
        type: actionTypes.CREATE_DIRECTORY,
        payload: directory,
    };
};

export const createDirectoryStart = () => {
    return {
        type: actionTypes.CREATE_DIRECTORY_START,
    };
};

export const createDirectoryFail = (error) => {
    return {
        type: actionTypes.CREATE_DIRECTORY_FAIL,
        error: error,
    };
};

export const createDirectorySuccess = (payload) => {
    return {
        type: actionTypes.CREATE_DIRECTORY_SUCCESS,
        payload: payload,
    };
};

export const triggerDirectoryFold = (payload) => {
    return {
        type: actionTypes.TRIGGER_DIRECTORY_FOLD,
        payload: payload,
    };
};

export const selectDirectory = (payload) => {
    return {
        type: actionTypes.SELECT_DIRECTORY,
        payload: payload,
    };
};

export const previewCreateDirectory = (payload) => {
    return {
        type: actionTypes.PREVIEW_CREATE_DIRECTORY,
        payload: payload,
    };
};

export const triggerCreatePreviewOff = (payload) => {
    return {
        type: actionTypes.TRIGGER_CREATE_PREVIEW_OFF,
        payload: payload,
    };
};
