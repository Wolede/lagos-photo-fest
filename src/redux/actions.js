import * as actionTypes from './actionTypes';

export const updateAuthenticated = ({ authUser }, isAuthenticated) => {
    console.log(authUser);
    if(isAuthenticated === true){

        localStorage.setItem('lagos-photo', JSON.stringify({ authUser, isAuthenticated}));

    }else{

        localStorage.clear();
    }

    return {
        type: actionTypes.UPDATE_AUTHENTICATED,
        payload: {
            authUser,
            isAuthenticated
        }
    }
}