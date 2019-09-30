import * as actionTypes from './actionTypes';

export const timeZonesGet = (diff) => {
    return {
        type: actionTypes.TIME_ZONES_GET,
        diff: diff
    };
}

export const timeZonesGetStart = () => {
    return {
        type: actionTypes.TIME_ZONES_GET_START
    };
}

export const timeZonesGetSuccess = (timeZones) => {
    return {
        type: actionTypes.TIME_ZONES_GET_SUCCESS,
        timeZones: timeZones
    };
}

export const timeZonesGetFail = (error) => {
    return {
        type: actionTypes.TIME_ZONES_GET_FAIL,
        error: error
    };
}


export const timeZoneLoadEdit = (id) => {
    return {
        type: actionTypes.TIME_ZONE_LOADEDIT,
        id: id
    };
}

export const timeZoneLoadEditReset = () => {
    return {
        type: actionTypes.TIME_ZONE_LOADEDIT_RESET
    };
}

export const timeZoneLoadEditStart = () => {
    return {
        type: actionTypes.TIME_ZONE_LOADEDIT_START
    };
}

export const timeZoneLoadEditSuccess = (payload) => {
    return {
        type: actionTypes.TIME_ZONE_LOADEDIT_SUCCESS,
        payload: payload
    };
}

export const timeZoneLoadEditFail = (error) => {
    return {
        type: actionTypes.TIME_ZONE_LOADEDIT_FAIL,
        error: error
    };
}

export const timeZoneEdit = (id, mode, payload) => {
    return {
        type: actionTypes.TIME_ZONE_EDIT,
        id: id,
        mode: mode,
        payload: payload
    };
}

export const timeZoneEditStart = () => {
    return {
        type: actionTypes.TIME_ZONE_EDIT_START
    };
}

export const timeZoneEditSuccess = () => {
    return {
        type: actionTypes.TIME_ZONE_EDIT_SUCCESS
    };
}

export const timeZoneEditFail = (error) => {
    return {
        type: actionTypes.TIME_ZONE_EDIT_FAIL,
        error: error
    };
}