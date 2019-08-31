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

    postGuestDataToFirebase = ({ first_name, last_name, email, guest_image }) => {
        console.log(this.props.firebase.database);
        const guestsListRef = this.props.firebase.database.ref('guests/');
        const newGuestRef = guestsListRef.push();

        newGuestRef.set({
            firstname: first_name,
            lastname: last_name,
            email: email,
            guestImage : guest_image
        });
        console.log('end');
        
    }

    confirmGuestDetails = () => {
        this.postGuestDataToFirebase(this.state);
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleConfirm = () => {

        this.setState({loading: true})

        setTimeout(() => { //this should change to the ajax method
            // if successful
            this.setState({ loading: false, confirmButtonText: "Saved" })

            // if error
            // this.setState({ loading: false, confirmButtonText: "An Error Occured!", buttonError: "button-error" })
        }, 2000)

        setTimeout(() => {
            this.setState({ loading: false, confirmed: true })
        }, 4000)
    }

    handleDownload = () => {
        const capture = document.querySelector("#capture")
        console.log(capture);
        
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
                <Card guestDetails={ guestDetails } />
                
                <div>
                {
                    this.state.confirmed === false && (
                        //confirm button
                        <button onClick={this.handleConfirm} className={`button secondary passport__btn ${this.state.buttonError}`}>
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
