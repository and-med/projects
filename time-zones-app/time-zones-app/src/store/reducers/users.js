import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: null,
    loading: false,
    error: null,
    actionFinished: false,
    selectedEntity: null,
    deleting: false,
    deleted: false
}

const usersGetStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
        actionFinished: false,
        selectedEntity: null,
        deleted: false
    });
}

const usersGetSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users,
        loading: false,
        error: null
    });
}

const usersGetFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const userEditStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const userEditSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        actionFinished: true
    });
}

const userEditFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const userLoadEditReset = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        selectedEntity: null
    });
}

const userLoadEditStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
        selectedEntity: null
    });
}

const userLoadEditSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        selectedEntity: action.payload
    });
}

const userLoadEditFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        selectedEntity: null
    });
}

const userDeleteStart = (state, action) => {
    return updateObject(state, {
        deleting: true,
        error: null,
        deleted: false
    });
}

const userDeleteSuccess = (state, action) => {
    return updateObject(state, {
        deleting: false,
        error: null,
        deleted: true
    });
}

const userDeleteFail = (state, action) => {
    return updateObject(state, {
        deleting: false,
        error: action.error,
        deleted: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USERS_GET_START: return usersGetStart(state, action);
        case actionTypes.USERS_GET_SUCCESS: return usersGetSuccess(state, action);
        case actionTypes.USERS_GET_FAIL: return usersGetFail(state, action);
        case actionTypes.USER_EDIT_START: return userEditStart(state, action);
        case actionTypes.USER_EDIT_SUCCESS: return userEditSuccess(state, action);
        case actionTypes.USER_EDIT_FAIL: return userEditFail(state, action);
        case actionTypes.USER_LOADEDIT_RESET: return userLoadEditReset(state, action);
        case actionTypes.USER_LOADEDIT_START: return userLoadEditStart(state, action);
        case actionTypes.USER_LOADEDIT_SUCCESS: return userLoadEditSuccess(state, action);
        case actionTypes.USER_LOADEDIT_FAIL: return userLoadEditFail(state, action);
        case actionTypes.USER_DELETE_START: return userDeleteStart(state, action);
        case actionTypes.USER_DELETE_SUCCESS: return userDeleteSuccess(state, action);
        case actionTypes.USER_DELETE_FAIL: return userDeleteFail(state, action);
        default:
            return state;
    }
}

export default reducer;