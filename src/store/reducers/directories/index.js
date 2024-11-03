import { combineReducers } from 'redux';

import allIdsReducer from './allIds';
import byidReducer from './byId';

export default combineReducers({
    allIds: allIdsReducer,
    byId: byidReducer,
});
