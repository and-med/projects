import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    timeZones: null,
    loading: false,
    error: null
}

const timeZonesGetStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const timeZonesGetSuccess = (state, action) => {
    return updateObject(state, {
        timeZones: action.timeZones,
        loading: false,
        error: null
    });
}

const timeZonesGetFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TIME_ZONES_GET_START: return timeZonesGetStart(state, action);
        case actionTypes.TIME_ZONES_GET_SUCCESS: return timeZonesGetSuccess(state, action);
        case actionTypes.TIME_ZONES_GET_FAIL: return timeZonesGetFail(state, action);
        default:
            return state;
    }
}

export default reducer;