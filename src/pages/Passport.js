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
        // Get a reference to the storage service, which is used to create references in your storage bucket
        console.log(guest_image);
        const uploadTask = this.props.firebase.storage
            .ref(`guestImages/${guest_image.name}`)
            .put(guest_image);

        uploadTask
            .on('state_changed', snapshot => {
                console.log(snapshot);
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                console.log(this.props.firebase.storage);
                switch (snapshot.state) {
                    case 'paused': 
                        console.log('Upload is paused');
                        break;
                    case 'running': 
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            }, error => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log('User does not have permission to access the object');
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        console.log('User canceled the upload');
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        console.log('Unknown error occurred');
                        break;

                    default:
                        break;
                }
                return false;
            }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    const guestsListRef = this.props.firebase.database.ref('guests/');
                    console.log(downloadURL);
                
                    const newGuestRef = guestsListRef.push();

                    newGuestRef.set({
                        guest_id,
                        first_name,
                        last_name,
                        email,
                        guest_image: downloadURL
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
                });
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
