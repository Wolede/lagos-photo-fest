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
        sex: 'M',
        guest_image: null,
        image_preview_url: null,
        inputValidation: true,
        emailValidation: true,
        fileTooLarge: false,
        fileNotFound: false 
    }
    
    onChangeHandler = (target) => {
        const { name, value, files } = target;        
        
        if(name === 'guest_image' || files){
            if(files.length > 0){
                let file = files[0];
                if(!this.fileTooLarge(file)){
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        this.setState({
                            [name]: file,
                            image_preview_url: reader.result,
                            fileTooLarge: false,
                            fileNotFound: false,
                        });
                    };
        
                    reader.readAsDataURL(file);
                }else{
                    this.setState({
                        [name]: file,
                        fileTooLarge: true,
                        fileNotFound: false,
                    });
                }             
            }else{
                this.setState({
                    fileTooLarge: false,
                    fileNotFound: true,
                });
            }
        }else{
            if(value.trim() ===''){
                this.setState({
                    [name]: value
                });
            }else{
                const validationState = this.resetValidationState();
                this.setState({
                    [name]: value,
                    ...validationState
                });
            }
        }
    }

    resetValidationState = () => {
        return {
            inputValidation: true,
            emailValidation: true,
            fileTooLarge: false,
            fileNotFound: false 
        }
    }

    componentDidMount(){
        if (this.props.isAuthenticated) {
            this.props.history.push('/guest-list');
        }
    }

    fileTooLarge = (file) => {
            let fileSize = file.size;
            //check if file is larger than 250kb
            if(fileSize > 250000){
                return true;
            } else {
                return false;
            }
    }

    submitHandler = () => {
        const response = this.validateInputs(this.state);

        if(response){
            const guest_id = `LP-${generateId()}`;
            // this.setState({inputValidation: true});
            return this.props.history.push({
                pathname:'/passport',
                state: { 
                    guestDetails: { ...this.state, guest_id }
                }
            });
        } else {
            return false;
            // this.setState({inputValidation: false});
        }
    }

    validateEmail= (mail) => {
        if(emailValidation(mail)){
            return true;
        } else {
            return false;
        }
    }

    validateInputs = ({ 
        first_name, 
        last_name, 
        email, 
        guest_image, 
        inputValidation, 
        emailValidation, 
        fileTooLarge, 
        fileNotFound 
    }) => {
        
        inputValidation = exists(first_name) && exists(last_name) && exists(email);
        console.log(inputValidation);
        emailValidation = this.validateEmail(email);
        console.log(emailValidation);

        if(guest_image){
            console.log(guest_image);
            fileTooLarge = this.fileTooLarge(guest_image);
            console.log( fileTooLarge);
        }else{
            fileNotFound = true;
        }

        console.log(fileTooLarge);
        if ( inputValidation && !fileTooLarge && !fileNotFound && emailValidation) {
            console.log(true);
            this.setState({
                emailValidation,
                inputValidation,
                fileTooLarge,
                fileNotFound
            });
            return true
        } else {
            console.log(false);
            this.setState({
                emailValidation,
                inputValidation,
                fileTooLarge,
                fileNotFound
            });
            return false;
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
                                October 25 - November 13, 2019
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
