import jwtDecode from 'jwt-decode';
import axiosAuth from '../../axios/axiosAuth';

import * as actions from '../actions';

let isRefreshing = false;

const tokenRefreshMiddleware = store => next => action => {
    const state = store.getState();
    if (state && state.auth && state.auth.token && !isRefreshing) {
        isRefreshing = true;
        console.log("[tokenRefreshMiddleware.js]: token is defined, checking for expiry");
        console.log("[tokenRefreshMiddleware.js]: expiryTime: ", state.auth.expiryTime);
        if (new Date().getTime() > state.auth.expiryTime * 1000) {
            console.log("[tokenRefreshMiddleware.js]: utctime: ", new Date().getTime());
            console.log("[tokenRefreshMiddleware.js]: token data: ", state.auth.token, state.auth.refreshToken);
            const refreshData = {
                token: state.auth.token,
                refreshToken: state.auth.refreshToken
            };
            console.log("[tokenRefreshMiddleware.js]: dispatching refreshTokenStart");  
            store.dispatch(actions.refreshTokenStart());
            console.log("[tokenRefreshMiddleware.js]: starting refresh request");  
            axiosAuth.post('/refresh', refreshData).then((response) => {
                console.log("[tokenRefreshMiddleware.js]: refresh request success: ", response);  
                const decoded = jwtDecode(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                store.dispatch(
                    actions.refreshTokenSuccess(response.data.token, response.data.refreshToken, decoded.id, decoded.exp));

                isRefreshing = false;

                next(action);
            }).catch(error => {
                console.log("[tokenRefreshMiddleware.js]: refresh request failed: ", error);  
                store.dispatch(actions.refreshTokenFail(error));
                store.dispatch(actions.logoutStart());
            });
        }
    } else {
        next(action);
    }
}

export default tokenRefreshMiddleware;