import { UPDATE_AUTHENTICATED } from './actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        
        default:
            return state;
    }
}

