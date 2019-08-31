import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

import { withRouter,  } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';

//import component
import Card from '../ui/Card';

class Passport extends Component {
    state = {
        loading: false
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

    render(){

        const { location: { state: { guestDetails } } } = this.props

        return (
            <Card guestDetails={ guestDetails } />
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


