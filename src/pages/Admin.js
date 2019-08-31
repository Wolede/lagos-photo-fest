import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';

// Redux
import { connect } from 'react-redux';
import { updateAuthenticated } from './../redux/actions';

// Custom Components
// import Form from './../components/Form';

class Admin extends Component {

    state = {
        loading: false,
        guests: {},
        username: '',
        password: '',
        error: null
    }

    validateInput = (inputData) => {

    }

    onChangeHandler = ({currentTarget: { name, value}}) => {
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    onSubmitHandler = (e) => {
        console.log('here');
        console.log(this.state);
        console.log(this.props.firebase);
        const { username, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(username, password)
            .then(() => {
                console.log('then');
                this.setState({ ...this.state });
                this.props.updateAuthenticated();
                this.props.history.push('/guest-list');
            })
            .catch(error => {
                console.log(error);
                this.setState({ error });
            });

            e.preventDefault();
    }

    componentDidMount(){
        if (this.props.isAuthenticated) {
            this.props.history.push('/guest-list');
        }
    }

    render() {
        return (
            <div className="passport-form">
                <form>
                    <div>
                        <h2 className="header bold">
                            Get Your Passport
                        </h2>
                    </div>
                    <div className="form-control">
                        <input 
                            autoComplete="off"
                            type="text" 
                            placeholder="User Name" 
                            name="username" 
                            value={this.state.username} 
                            onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-control">
                        <input 
                            type="password" 
                            placeholder="Last Name" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-control">
                        <button type="button" onClick={this.onSubmitHandler} className="button primary"> Continue </button>
                    </div>
                </form>
            </div>
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

