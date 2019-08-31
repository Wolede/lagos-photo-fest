import React from 'react';

//Logo import
import logo from '../assets/images/logo.png';

//import component
import Card from '../ui/Card';




const passport = () => {

    return (
        <div className="container passport__container">
            <div className="passport__div">
                <img src={logo} alt="logo" className="passport__div__logo"/>
            </div>

            <Card/>
        </div>
    );

};

export default passport;


