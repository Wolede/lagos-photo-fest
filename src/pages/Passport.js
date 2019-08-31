import React from 'react';

//import component
import Card from '../ui/Card';




const passport = () => {

    return (

        <div className="passport__card__container">
            <Card/>

            <button className="button button-success passport__btn">Download</button>

            <a href="#" className="passport__link"> Go back</a>
        </div>

    );

};

export default passport;


