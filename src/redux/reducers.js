import { UPDATE_AUTHENTICATED } from './actionTypes';

let initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    authUser: null
};

// console.log(loggedInUser);

const lagosPhoto = localStorage.getItem('lagos-photo');

if (lagosPhoto) {
    const lagosPhotoAuthUser = JSON.parse(lagosPhoto);

    if (lagosPhotoAuthUser) {
        const { authUser, isAuthenticated } = JSON.parse(lagosPhoto);
    
        initialState = {
            ...initialState,
            isAuthenticated,
            authUser,
        }
    }
}



export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: payload.isAuthenticated,
                loading: false,
                authUser: payload.authUser
            };
        
        default:
            return state;
    }
}

