import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    timeZones: null,
    loading: false,
    error: null,
    actionFinished: false,
    selectedEntity: null,
    deleting: false,
    deleted: false
}

const timeZonesGetStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
        actionFinished: false,
        selectedEntity: null,
        deleted: false
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

const timeZoneEditStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const timeZoneEditSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        actionFinished: true
    });
}

const timeZoneEditFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const timeZoneLoadEditReset = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        selectedEntity: null
    });
}

const timeZoneLoadEditStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
        selectedEntity: null
    });
}

const timeZoneLoadEditSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        selectedEntity: action.payload
    });
}

const timeZoneLoadEditFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        selectedEntity: null
    });
}

const timeZoneDeleteStart = (state, action) => {
    return updateObject(state, {
        deleting: true,
        error: null,
        deleted: false
    });
}

const timeZoneDeleteSuccess = (state, action) => {
    return updateObject(state, {
        deleting: false,
        error: null,
        deleted: true
    });
}

const timeZoneDeleteFail = (state, action) => {
    return updateObject(state, {
        deleting: false,
        error: action.error,
        deleted: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TIME_ZONES_GET_START: return timeZonesGetStart(state, action);
        case actionTypes.TIME_ZONES_GET_SUCCESS: return timeZonesGetSuccess(state, action);
        case actionTypes.TIME_ZONES_GET_FAIL: return timeZonesGetFail(state, action);
        case actionTypes.TIME_ZONE_EDIT_START: return timeZoneEditStart(state, action);
        case actionTypes.TIME_ZONE_EDIT_SUCCESS: return timeZoneEditSuccess(state, action);
        case actionTypes.TIME_ZONE_EDIT_FAIL: return timeZoneEditFail(state, action);
        case actionTypes.TIME_ZONE_LOADEDIT_RESET: return timeZoneLoadEditReset(state, action);
        case actionTypes.TIME_ZONE_LOADEDIT_START: return timeZoneLoadEditStart(state, action);
        case actionTypes.TIME_ZONE_LOADEDIT_SUCCESS: return timeZoneLoadEditSuccess(state, action);
        case actionTypes.TIME_ZONE_LOADEDIT_FAIL: return timeZoneLoadEditFail(state, action);
        case actionTypes.TIME_ZONE_DELETE_START: return timeZoneDeleteStart(state, action);
        case actionTypes.TIME_ZONE_DELETE_SUCCESS: return timeZoneDeleteSuccess(state, action);
        case actionTypes.TIME_ZONE_DELETE_FAIL: return timeZoneDeleteFail(state, action);
        default:
            return state;
    }
}

export default reducer;