import React, { Component } from 'react';
import { withRouter,  } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';

// Redux
import { connect } from 'react-redux';

import Form from '../components/Form';

class Home extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        guest_image: ''
    }
    
    onChangeHandler = ({ name, value}) => {
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    submitHandler = () => {
        const response = this.validateInputs(this.state);
        if(response){
            this.props.history.push({
                pathname:'/passport',
                state: { 
                    guestDetails: { ...this.state }
                }
            });
        }
    }

    validateInputs = ({ first_name, last_name, email, guest_image }) => {
        return true;
    }

    render() {
        return (
            <section className="home">
                {/* <GuestList /> */}
                <div className="flex">
                    <div className="col-1">
                        <div className="text-wrapper text-white"> 
                            <h1 className="mega bold">
                                10th Annual Festival
                            </h1>
                            <p >
                            Begin your journey on this special 10th Edition of Lagos Photo.
                            <br /><br />
                            Get a passport to ensure you have an exciting time as you experience all the events lined up this year.
                            </p>
                            <h3 className="header regular">
                                Time: 00:00
                                <br /><br />
                                Location: xxxx, xxx, xxxxxxxx, xxxxx
                            </h3>
                        </div>
                    </div>
                    <div className="col-1">
                        <div className="form-wrapper">
                            <Form 
                                onClick={this.submitHandler}
                                onChange={this.onChangeHandler}/>
                            <div className="text-center powered-by">powered by <a href="http://minimalyst.design" target="_blank">minimalyst.design</a></div>
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

const HomeBase = compose(
    withRouter,
    connect(mapStateToProps),
    withFirebase
)(Home);

export default HomeBase;
