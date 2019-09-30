import * as actionTypes from './actionTypes';

export const usersGet = () => {
    return {
        type: actionTypes.USERS_GET
    };
}

export const usersGetStart = () => {
    return {
        type: actionTypes.USERS_GET_START
    };
}

export const usersGetSuccess = (users) => {
    return {
        type: actionTypes.USERS_GET_SUCCESS,
        users: users
    };
}

export const usersGetFail = (error) => {
    return {
        type: actionTypes.USERS_GET_FAIL,
        error: error
    };
}

export const userLoadEdit = (id) => {
    return {
        type: actionTypes.USER_LOADEDIT,
        id: id
    };
}

export const userLoadEditReset = () => {
    return {
        type: actionTypes.USER_LOADEDIT_RESET
    };
}

export const userLoadEditStart = () => {
    return {
        type: actionTypes.USER_LOADEDIT_START
    };
}

export const userLoadEditSuccess = (payload) => {
    return {
        type: actionTypes.USER_LOADEDIT_SUCCESS,
        payload: payload
    };
}

export const userLoadEditFail = (error) => {
    return {
        type: actionTypes.USER_LOADEDIT_FAIL,
        error: error
    };
}

export const userEdit = (id, mode, payload) => {
    return {
        type: actionTypes.USER_EDIT,
        id: id,
        mode: mode,
        payload: payload
    };
}

export const userEditStart = () => {
    return {
        type: actionTypes.USER_EDIT_START
    };
}

export const userEditSuccess = () => {
    return {
        type: actionTypes.USER_EDIT_SUCCESS
    };
}

export const userEditFail = (error) => {
    return {
        type: actionTypes.USER_EDIT_FAIL,
        error: error
    };
}

export const userDelete = (id) => {
    return {
        type: actionTypes.USER_DELETE,
        id: id
    };
}

export const userDeleteStart = () => {
    return {
        type: actionTypes.USER_DELETE_START
    };
}

export const userDeleteSuccess = () => {
    return {
        type: actionTypes.USER_DELETE_SUCCESS
    };
}

export const userDeleteFail = (error) => {
    return {
        type: actionTypes.USER_DELETE_FAIL,
        error: error
    };
}