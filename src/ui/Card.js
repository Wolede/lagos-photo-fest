import React from 'react';

//import images
import profilePic from "../assets/images/background.jpg"
import logo from "../assets/images/logo.png";

const Card = (props) => {

    const { 
        isAuthenticated,
        guestDetails: {
            guest_id, 
            first_name, 
            last_name,
            guest_image,
            image_preview_url
        } 
    } = props;

    return (
        <div id="capture" className="card">

            <h3 className="card__header header semi-bold">LAGOS PHOTO FESTIVAL 2019</h3>
            <div className="card__details">
                <div className="card__main">
                    <img src={(isAuthenticated) ?  guest_image : image_preview_url} className="card__details__img" alt="Guest Profile"/>
                    <div className="card__info">
                        <div className="card__details--info">
                            <p className="regular card__details--info__p">First Name</p>
                            <h2 className="semi-bold card__details--info__h">{first_name}</h2>
                        </div>
                        <div className="card__details--info">
                            <p className="regular card__details--info__p">Last Name</p>
                            <h2 className="semi-bold card__details--info__h">{last_name }</h2>
                        </div>

                        <div className="card__details--info">
                            <p className="regular card__details--info__p">Passport No</p>
                            <h2 className="semi-bold card__details--info__h">{ guest_id }</h2>
                        </div>
                    </div>
                </div>

                <div className="card__aside">
                    <p className="regular card__aside__p">
                        Authority
                    </p>
                    <img className="card__aside__img" src={logo} alt="logo"/>
                </div>
            </div>
        </div>
    );

};

export default Card;