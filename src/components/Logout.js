import React from 'react';

const Logout = ({onClick}) => {
    return (
        <p
            className="logout"
            onClick={ onClick }>Logout</p>
    );
}

export default Logout;