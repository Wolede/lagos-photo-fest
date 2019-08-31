import * as actionTypes from './actionTypes';

export const updateAuthenticated = (value) => {
    return {
        type: actionTypes.UPDATE_AUTHENTICATED,
        payload: value
    }
}