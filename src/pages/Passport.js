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
        this.setState({loading: true})
        const capture = document.querySelector("#capture")
        const options = {
            scrollX: 0,
            scrollY:  0
        }
        html2canvas(capture, options).then(canvas => {
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
        setTimeout(() => {
            this.setState({ loading: false });
        }, 4000);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/');
            }
        }
    }
    
    // componentDidMount(){
	// 	if (!this.props.isAuthenticated) {
	// 		this.props.history.push('/');
    //     }
    // }

    render(){

        const { 
            isAuthenticated,
            location: { 
                state 
            } 
        } = this.props;
        
        console.log(this.props);

        // if(!isAuthenticated){
        //     return <Redirect to="/" />
        // }

        if(state === undefined){
            return <Redirect to="/" />
        }

        const { guestDetails } = state;

        return (
            <div className="passport__card__container">
                {/* <Logout /> */}
                <Card 
                    guestDetails={ guestDetails } 
                    isAuthenticated={isAuthenticated}/>
                
                <div>
                {
                    (this.state.confirmed === false && !this.props.isAuthenticated) && (
                        //confirm button
                        <button onClick={this.confirmGuestDetails} className={`button secondary passport__btn ${this.state.buttonError}`}>
                            { this.state.loading === true ? <Loader/> : this.state.confirmButtonText }
                        </button>
                    )
                }

                {
                    (this.state.confirmed === true || this.props.isAuthenticated) && (
                        //download button
                        <button onClick={this.handleDownload} className={`button primary passport__btn ${this.state.buttonError}`}>
                            { this.state.loading === true ? <Loader/> : "Download" }
                        </button>
                    )
                }

                </div>

                <p 
                    className="passport__link"
                    onClick={this.goBack}> Go back</p>
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
