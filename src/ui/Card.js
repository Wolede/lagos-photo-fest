import React from 'react';

//import images
import logo from "../assets/images/10th-Edition-LPF-Logo.png";
import passportLabel from "../assets/images/passport-typo.png";

const Card = (props) => {

    const { 
        isAuthenticated,
        guestDetails: {
            guest_id, 
            first_name, 
            last_name,
            guest_image,
            place_of_birth,
            nationality,
            sex,
            date_of_birth,
            image_preview_url
        }
    } = props;
    console.log(guest_image);

    // formatting the date 
    let date = new Date(date_of_birth);
    let dateOfBirth = date.toDateString();
    let formattedDate = dateOfBirth.slice(dateOfBirth.indexOf(' ') + 1, -5); // remove Day and Year
    // let formattedDate = dateOfBirth.substr(dateOfBirth.indexOf(' ') + 1); // remove Day
    console.log(formattedDate)
    return (
        <div id="capture" className="card">
            <div className="card-header">
                <div>
                    <p>
                        {"<DETAILS PROVIDED ARE NOT TO BE USED FOR OFFICIAL IDENTIFICATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}
                    </p>
                </div>
                <div>
                    <img src={passportLabel} alt="passport label"/>
                </div>
            </div>
            {/* <h3 className="card__header header semi-bold">LAGOS PHOTO FESTIVAL 2019</h3> */}
            <div className="card__details">
                <div className="card__main">
                    {/* <img src={(isAuthenticated) ?  guest_image : image_preview_url} className="card__details__img" alt="Guest Profile"/> */}
                    <div className="card__details__img" style={{backgroundImage: `url(${(isAuthenticated) ?  guest_image : image_preview_url})`}}>

                    </div>
                    <div className="card__info">
                        <div className="card__details--info">
                            <p className="regular card__details--info__p">First Name</p>
                            <h2 className="semi-bold card__details--info__h">{ first_name}</h2>
                        </div>
                        <div className="card__details--info">
                            <p className="regular card__details--info__p">Last Name</p>
                            <h2 className="semi-bold card__details--info__h">{ last_name }</h2>
                        </div>
                        <div className="card__details--info">
                            <p className="regular card__details--info__p">Nationality</p>
                            <h2 className="semi-bold card__details--info__h">{ nationality }</h2>
                        </div>
                        <div className="card__details--info">
                            <p className="regular card__details--info__p">Date of Birth</p>
                            <h2 className="semi-bold card__details--info__h">{ formattedDate }</h2>
                        </div>
                        <div className="card__details--info split">
                            <div>
                                <p className="regular card__details--info__p">Sex</p>
                                <h2 className="semi-bold card__details--info__h">{ sex }</h2>
                            </div>
                            <div>
                                <p className="regular card__details--info__p">Place of Birth</p>
                                <h2 className="semi-bold card__details--info__h">{ place_of_birth }</h2>
                            </div>
                        </div>
                        <div className="card__details--info">
                            <p className="regular card__details--info__p">Expiry Date</p>
                            <h2 className="semi-bold card__details--info__h">Nov 15 2019</h2>
                        </div>

                    </div>
                </div>

                <div className="card__aside">
                    <div className="card__aside--info">
                        <p className="regular card__details--info__p">Passport No</p>
                        <h2 className="semi-bold card__details--info__h">{ guest_id }</h2>
                    </div>
                    <p className="regular card__aside__p">
                        Authorization By
                    </p>
                    <img className="card__aside__img" src={logo} alt="logo"/>
                </div>
            </div>
            <div className="card-footer">
                <p>
                    {"<PASSPORTS>>><LAGOSPHOTO>>>><FESTIVAL>>>>>>>>>>>>>>>>>>><OCTOBER><NOV><2019>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}
                </p>
            </div>
        </div>
    );

};

export default Card;