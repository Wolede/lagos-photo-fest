import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { withRouter,  } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';

//import component
import Card from '../ui/Card';
import Loader from '../ui/Loader';

class Passport extends Component {
    state = {
        loading: false,
        loaded: false,
        confirm: true
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

    backToHome = () => {
        this.postGuestDataToFirebase(this.state);
    }

    handleConfirm = () => {

        this.setState({loading: true})

        setTimeout(() => {
            this.setState({loading: false, confirm: false })
        }, 2000)
    }

    handleDownload = () => {

    }

    render(){

        const { location: { state: { guestDetails } } } = this.props

        return (
            <div className="passport__card__container">
                <Card guestDetails={ guestDetails } />
                
                <div>
                {
                    this.state.confirm === true && (
                        //confirm button
                        <button onClick={this.handleConfirm} className="button secondary passport__btn">
                            { this.state.loading === true ? <Loader/> : "Confirm Details and Save"}
                        </button>
                    )
                }

                {
                    this.state.confirm === false && (
                        //download button
                        <button onClick={this.handleDownload} className={`button primary passport__btn`}>
                            Download
                        </button>
                    )
                }

                </div>

                <a href="#" className="passport__link"> Go back</a>
            </div>
        );
    }
};

const mapStateToProps = ({ isAuthenticated }) => {
    return {
        isAuthenticated
    }
}

const PassportBase = compose(
    withRouter,
    connect(mapStateToProps),
    withFirebase
)(Passport);

export default PassportBase;


