import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { updateAuthenticated } from './redux/actions';

import { compose } from 'recompose';

// Firebase
import { withFirebase } from "./db";

// App Router
import Router from './routes/index';
import Logout from './components/Logout';

// Images
import logo from "./assets/images/10th-Edition-LPF-Logo.png";

class App extends Component {

    logoutHandler = () => {
        this.props.firebase.doSignOut();
        this.props.updateAuthenticated({ authUser: null }, false);
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
            ? this.props.updateAuthenticated({ authUser }, true)
            : this.props.updateAuthenticated({ authUser: null }, false);
        });
    }

    render() {

        const { isAuthenticated } = this.props;

        return (
            <div className="cover__image">
                <div className="container passport__container">
                    { (isAuthenticated) && <Logout onClick={ this.logoutHandler }/>}
                    <div className="passport__div">
                        <a href="/">
                            <img src={logo} alt="logo" className="passport__div__logo"/>
                        </a>
                    </div>
                    <Router />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ isAuthenticated }) => {
    return {
        isAuthenticated
    };
};

const AppBase = compose(
    connect(mapStateToProps, { updateAuthenticated }),
    withFirebase
)(App);

export default AppBase;