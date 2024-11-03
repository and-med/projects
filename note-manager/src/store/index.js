import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import directoriesReducer from './reducers/directories';
import noticesReducer from './reducers/notices';
import tagsReducer from './reducers/tags';
import directoriesManagerReducer from './reducers/DirectoriesManager';
import updateNoticeReducer from './reducers/UpdateNotice';
import noticeListReducer from './reducers/NoticeList';
import searchReducer from './reducers/search';
import { watchDirectories, watchNotices, watchSearch } from './sagas';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : null || compose;

const rootReducer = combineReducers({
    directories: directoriesReducer,
    notices: noticesReducer,
    tags: tagsReducer,
    directoriesManager: directoriesManagerReducer,
    updateNotice: updateNoticeReducer,
    noticeList: noticeListReducer,
    search: searchReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchDirectories);
sagaMiddleware.run(watchNotices);
sagaMiddleware.run(watchSearch);

export default store;
