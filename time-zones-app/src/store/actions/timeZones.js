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

