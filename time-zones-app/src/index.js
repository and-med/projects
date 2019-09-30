import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import authReducer from './store/reducers/auth';
import timeZonesReducer from './store/reducers/timeZones';
import usersReducer from './store/reducers/users';
import { watchAuth, watchTimeZones, watchUsers } from './store/sagas';
import tokenRefreshMiddleware from './store/middlewares/tokenRefreshMiddleware';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    timeZones: timeZonesReducer,
    users: usersReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware, tokenRefreshMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchTimeZones);
sagaMiddleware.run(watchUsers);

var app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
