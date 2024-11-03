import * as actionTypes from './actionTypes';

export const auth = (email, password) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password
    };
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, refreshToken, userId, expiryTime, role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        refreshToken: refreshToken,
        userId: userId,
        expiryTime: expiryTime,
        role: role
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const authReset = () => {
    return {
        type: actionTypes.AUTH_RESET
    };
}

export const logoutStart = () => {
    return {
        type: actionTypes.LOGOUT_START
    };
}

export const logoutSucceded = () => {
    return {
        type: actionTypes.LOGOUT_SUCCEEDED
    };
}

export const authTryAutoSignup = () => {
    return {
        type: actionTypes.AUTH_TRY_AUTO_SIGNUP
    }
}

export const refreshTokenStart = () => {
    return {
        type: actionTypes.REFRESH_TOKEN_START
    };
}

export const refreshTokenSuccess = (token, refreshToken, userId, expiryTime, role) => {
    return {
        type: actionTypes.REFRESH_TOKEN_SUCCESS,
        token: token,
        refreshToken: refreshToken,
        userId: userId,
        expiryTime: expiryTime,
        role: role
    };
}

export const refreshTokenFail = (refreshError) => {
    return {
        type: actionTypes.REFRESH_TOKEN_FAIL,
        refreshError: refreshError
    };
}

export const registerUser = (firstName, lastName, email, password) => {
    return {
        type: actionTypes.REGISTER_USER,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };
}

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
}

export const registerSuccess = (token, refreshToken, userId, expiryTime, role) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        token: token,
        refreshToken: refreshToken,
        userId: userId,
        expiryTime: expiryTime,
        role: role
    };
}

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
}