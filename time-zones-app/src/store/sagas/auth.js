import { put, call } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import axiosAuth from '../../axios/axiosAuth';

import * as actions from '../actions';

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password
    };
    try {
        const response = yield axiosAuth.post('/login', authData);

        const decoded = jwtDecode(response.data.token);
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('refreshToken', response.data.refreshToken);
        yield put(actions.authSuccess(response.data.token, response.data.refreshToken, decoded.id, decoded.exp, decoded.role));
        
    } catch (error) {
        yield put(actions.authFail(error.response.data));
    }
}

export function* logoutStartSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'refreshToken');
    yield put(actions.logoutSucceded());
}

export function* authTryAutoSignupSaga(action) {
    const token = yield localStorage.getItem('token');
    const refreshToken = yield localStorage.getItem('refreshToken');

    if (!token) {
        yield put(actions.logoutStart());
    } else {
        const decoded = jwtDecode(token);
        yield put(actions.authSuccess(token, refreshToken, decoded.id, decoded.exp, decoded.role));
    }
}

export function* registerUserSaga(action) {
    yield put(actions.registerStart());
    const registerData = {
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        password: action.password
    };
    try {
        const response = yield axiosAuth.post('/register', registerData);
        
        const decoded = jwtDecode(response.data.token);
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('refreshToken', response.data.refreshToken);
        yield put(actions.registerSuccess(response.data.token, response.data.refreshToken, decoded.id, decoded.exp, decoded.role));
    } catch (error) {
        yield put(actions.registerFail(error.response.data));
    }
}