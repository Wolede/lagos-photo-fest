import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';

// Redux
import { connect } from 'react-redux';
import { updateAuthenticated } from './../redux/actions';

// Custom Components
import LoginForm from './../components/LoginForm';

class Admin extends Component {
    state = {
        loading: false,
        email: '',
        password: '',
        error: null
    }

    inputValidationHandler = (inputData) => {
        return true;
    }

    inputChangeHandler = ({ name, value}) => {
        this.setState({
            [name]: value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log('here');
        console.log(this.state);
        console.log(this.props.firebase);
        const { email, password } = this.state;
        const response = this.inputValidationHandler(this.state);
        if(response){
            this.props.firebase
                .doSignInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log(this.props)
                    this.setState({ ...this.state });
                    this.props.updateAuthenticated({ authUser: {} }, true);
                    this.props.history.push('/guest-list');
                })
                .catch(error => {
                    this.setState({ error });
                });
        }else{
            return false;
        }
    }

    componentDidMount(){
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {

        return (
            <section className="home">
                {/* <GuestList /> */}
                <div className="flex">
                    <div className="col-1">
                        <div className="form-wrapper">
                            <LoginForm 
                                inputValues={ {...this.state} }
                                onClick={this.submitHandler}
                                onChange={this.inputChangeHandler}/>
                            <div className="text-center powered-by">powered by <a href="http://minimalyst.design" without rel="noopener noreferrer" target="_blank">minimalyst.design</a></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ isAuthenticated }) => {
    return {
        isAuthenticated
    }
}

const AdminSignInForm = compose(
    withRouter,
    connect(mapStateToProps, { updateAuthenticated }),
    withFirebase,
)(Admin);

export default AdminSignInForm;

