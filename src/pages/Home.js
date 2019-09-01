import React, { Component } from 'react';
import { withRouter,  } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';

// Redux
import { connect } from 'react-redux';

// Controllers
import { generateId } from './../controllers/strings';

import Form from '../components/Form';

class Home extends Component {
    state = {
        guest_id: '',
        first_name: '',
        last_name: '',
        email: '',
        guest_image: null,
        image_preview_url: null
    }
    
    onChangeHandler = (target) => {
        const { name, value, files } = target;
        
        if(name === 'guest_image' || files){
            let reader = new FileReader();
            let file = files[0];
            
            reader.onloadend = () => {
                
                this.setState({
                    [name]: file,
                    image_preview_url: reader.result
                });
            };

            reader.readAsDataURL(file);
        }else{
            this.setState({
                [name]: value
            });
        }
    }

    submitHandler = () => {
        const response = this.validateInputs(this.state);

        const guest_id = `LP-${generateId()}`;

        if(response){
            this.props.history.push({
                pathname:'/passport',
                state: { 
                    guestDetails: { ...this.state, guest_id }
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
                                inputValues={this.state} 
                                onClick={this.submitHandler}
                                onChange={this.onChangeHandler}/>
                            <div className="text-center powered-by">powered by <a href="http://minimalyst.design" without="true" rel="noopener noreferrer" target="_blank">minimalyst.design</a></div>
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
