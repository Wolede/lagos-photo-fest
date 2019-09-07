import React, { Component } from 'react';
import { withRouter,  } from 'react-router-dom';
import { compose } from 'recompose';

import { exists, emailValidation } from '../controllers/validation';

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
        inputValidation: true,
        emailValidation: false,
        fileTooLarge: false 

    }
    
    onChangeHandler = (target) => {
        const { name, value, files } = target;        
        

        if(name === 'guest_image' || files){
            let reader = new FileReader();
            let file = files[0];
            

            if(!this.validateFile(file)){
                reader.onloadend = () => {
                
                    this.setState({
                        inputValidation: false,
                        fileTooLarge: true,
                        [name]: file,
                        image_preview_url: reader.result
                    });
                };

                reader.readAsDataURL(file);
            } else{                
                reader.onloadend = () => {
                
                    this.setState({
                        [name]: file,
                        image_preview_url: reader.result
                    });
                };
    
                reader.readAsDataURL(file);
            }
        }else{
            this.setState({
                [name]: value
            });
        }
    }

    validateFile = (file) => {
            let fileSize = file.size;
            // console.log("file size", fileSize);

            //check if file is larger than 250kb
            if(fileSize > 250000){
                this.setState({fileTooLarge: true})
                return false;
            } else {
                return true;
            }
    }

    submitHandler = () => {
        const response = this.validateInputs(this.state);

        if(response){
            const guest_id = `LP-${generateId()}`;
            this.setState({inputValidation: true});
            this.props.history.push({
                pathname:'/passport',
                state: { 
                    guestDetails: { ...this.state, guest_id }
                }
            });
        } else {
            this.setState({inputValidation: false});
        }
    }

    validateEmail= (mail) => {
        if(emailValidation(mail)){
            return true;
        } else {
            return false;
        }
    }

    validateInputs = ({ first_name, last_name, email, guest_image }) => {
        let is_valid = false;

        if(guest_image){
            is_valid = this.validateFile(guest_image)
        }
        
        console.log(guest_image);


        
        
        if (exists(first_name) && exists(last_name) && exists(email) && is_valid) {
            
            if(this.validateEmail(email)){
                this.setState({emailValidation: true});
                return true
            } else {
                this.setState({emailValidation: false});
                return false;
            }
            
        } 
        
    }

    render() {
        return (
            <section className="home">
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
