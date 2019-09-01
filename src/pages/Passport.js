import React, { Component } from "react";

import html2canvas from "html2canvas";

// Redux
import { connect } from 'react-redux';

import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from "./../db";

//import component
import Card from "../ui/Card";
import Loader from "../ui/Loader";

class Passport extends Component {
    state = {
        loading: false,
        loaded: false,
        confirmed: false, //confirm should be true when coming from the Guest List Page
        confirmButtonText: "Confirm Details and Save",
        buttonError: ""
    }

    postGuestDataToFirebase = ({ guest_id, first_name, last_name, email, guest_image }) => {
        const guestsListRef = this.props.firebase.database.ref('guests/');
        const newGuestRef = guestsListRef.push();

        newGuestRef.set({
            guest_id,
            first_name,
            last_name,
            email,
            guest_image
        })
        .then(() => {
            // if successful
            this.setState({ loading: false, confirmButtonText: "Saved!!!" });
            setTimeout(() => {
                this.setState({ loading: false, confirmed: true });
            }, 1000);
        })
        .catch((error) => {
            // if error
            this.setState({ loading: false, confirmButtonText: "An Error Occured!!!", buttonError: "button-error" });

            setTimeout(() => {
                this.setState({ loading: false, confirmed: false, confirmButtonText: "Saved!", buttonError: "" });
            }, 1000);
        });
        
        // Get a reference to the storage service, which is used to create references in your storage bucket
        const uploadTask = this.props.firebase.storage
                            .ref(`images/${guest_image.name}`)
                            .put(guest_image);
                            

        uploadTask
            .on('state_changed', snapshot => {

            }, error => {
                return false;
            }, complete => {
                return true;
            })
        
    }

    confirmGuestDetails = () => {
        this.setState({loading: true})
        this.postGuestDataToFirebase(this.props.location.state.guestDetails)

    }

    goBack = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleDownload = () => {
        const capture = document.querySelector("#capture")
        
        html2canvas(capture).then(canvas => {
            // document.body.appendChild(canvas)
            // console.log("som'n happen");
    
            let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream") ;
            let a = document.createElement('a')
            a.setAttribute('href', image)
            a.setAttribute('download', 'LPF-Passport.png')
    
            a.style.display = 'none'
    
            document.body.appendChild(a)
    
            a.click()
    
            document.body.removeChild(a)
            // window.location.href = image;
        });
    };

    render(){

        const { 
            isAuthenticated,
            location: { 
                state 
            } 
        } = this.props;
        
        console.log(this.props);

        if(state === undefined){
            return <Redirect to="/" />
        }

        const { guestDetails } = state;

        return (
            <div className="passport__card__container">
                <Card 
                    guestDetails={ guestDetails } 
                    isAuthenticated={isAuthenticated}/>
                
                <div>
                {
                    this.state.confirmed === false && (
                        //confirm button
                        <button onClick={this.confirmGuestDetails} className={`button secondary passport__btn ${this.state.buttonError}`}>
                            { this.state.loading === true ? <Loader/> : this.state.confirmButtonText }
                        </button>
                    )
                }

                {
                    this.state.confirmed === true && (
                        //download button
                        <button onClick={this.handleDownload} className={`button primary passport__btn ${this.state.buttonError}`}>
                            Download
                        </button>
                    )
                }

                </div>

                <a 
                    href="#" 
                    className="passport__link"
                    onClick={this.goBack}> Go back</a>
            </div>
        );
    }
};

const mapStateToProps = ({ isAuthenticated }) => {
    return {
        isAuthenticated
    };
};

const PassportBase = compose(
    withRouter,
    connect(mapStateToProps),
    withFirebase
)(Passport);

export default PassportBase;
