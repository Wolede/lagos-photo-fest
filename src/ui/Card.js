import React from 'react';

//import images
import profilePic from "../assets/images/background.jpg"

const card = () =>{
    return(
        <div className="card">

            <h3 className="card__header header semi-bold">LAGOS PHOTO FESTIVAL 2019</h3>

            <div className="card__details">
                <img src={profilePic} className="card__details__img" alt="profile image"/>

                <div className="card__details--info">
                    <p className="regular">
                        FIRST NAME
                    </p>





                </div>
            </div>
        </div>
    );

};

export default card;