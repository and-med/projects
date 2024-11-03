import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    refreshToken: null,
    userId: null,
    expiryTime: null,
    role: null,
    error: null,
    loading: false,
    refreshError: null,
    refreshing: false
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        refreshToken: action.refreshToken,
        userId: action.userId,
        expiryTime: action.expiryTime,
        role: action.role,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authReset = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
}

const logoutSucceeded = (state, action) => {
    return updateObject(state, {
        token: null,
        refreshToken: null,
        userId: null,
        expiryTime: null,
        role: null
    });
}

const refreshTokenStart = (state, action) => {
    return updateObject(state, {
        refreshError: null,
        refreshing: true
    });
}

const refreshTokenSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        refreshToken: action.refreshToken,
        userId: action.userId,
        expiryTime: action.expiryTime,
        role: action.role,
        refreshError: null,
        refreshing: false        
    });
}

const refreshTokenFail = (state, action) => {
    return updateObject(state, {
        refreshError: action.refreshError,
        refreshing: false
    });
}

const registerStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const registerSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        refreshToken: action.refreshToken,
        userId: action.userId,
        expiryTime: action.expiryTime,
        role: action.role,
        error: null,
        loading: false        
    });
}

const registerFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false        
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_RESET: return authReset(state, action);
        case actionTypes.LOGOUT_SUCCEEDED: return logoutSucceeded(state, action);
        case actionTypes.REFRESH_TOKEN_START: return refreshTokenStart(state, action);
        case actionTypes.REFRESH_TOKEN_SUCCESS: return refreshTokenSuccess(state, action);
        case actionTypes.REFRESH_TOKEN_FAIL: return refreshTokenFail(state, action);
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        default:
            return state;
    }
}

export default reducer;