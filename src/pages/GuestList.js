import React, { Component } from 'react'
import GuestListItem from '../components/GuestListItem';
import NoGuestListItem from '../components/NoGuestListItem';
import searchIcon from '../assets/images/icons-search.svg'

// Redux
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';

class GuestList extends Component {

    state = {
		loading: false,
		guests: null,
        error: null,
        searchTerm: ''
    }

    
    viewGuestDetails = (target) => {
        this.props.firebase.getGuestById(target.dataset['id']).on('value', snapshot => {
			this.props.history.push({
                pathname:'/passport',
                state: { 
                    guestDetails: { ...snapshot.val() }
                }
            });
		});
    }

    onChangeHandler = ({ target : { name, value } }) => {
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        }, () => {
            this.props.firebase.getGuests().on('value', snapshot => {
                console.log(snapshot);
                console.log(snapshot.val());
                if(snapshot.val()){
                    const guestsObject = snapshot.val();
                    const guestsList = Object.keys(guestsObject).map(key => ({
                        ...guestsObject[key],
                        uid: key,
                    }));
    
                    this.setState({
                        guests: [...guestsList],
                        loading: false,
                    });
                    
                }else{
                    this.setState({
                        guests: [],
                        loading: false,
                    });
                }
            });
        });
    }

    componentDidMount(){
		if (!this.props.isAuthenticated) {
			this.props.history.push('/admin');
		}
		
		this.setState({ loading: true });
		console.log(this.props);
		
		this.props.firebase.getGuests().on('value', snapshot => {
			console.log(snapshot);
			console.log(snapshot.val());
            if(snapshot.val()){
                const guestsObject = snapshot.val();
                const guestsList = Object.keys(guestsObject).map(key => ({
                    ...guestsObject[key],
                    uid: key,
                }));

                this.setState({
                    guests: [...guestsList],
                    loading: false,
                });
                
            }else{
                this.setState({
                    guests: [],
                    loading: false,
                });
            }
		});
	}

    render() {

        const { guests } = this.state;

        let renderComponent = null ;

        console.log(guests);

        if(guests){
            if(guests.length > 0){
                renderComponent = (
                    guests.map((guest, index) => {
                        return <GuestListItem 
                            key={index} 
                            guest={guest}
                            onClick={this.viewGuestDetails}/>
                    })
                );
            }else{
                console.log(this.searchTerm)
                renderComponent = <NoGuestListItem/>
            }
        }
        
        return (
            <section className="guest-list">
                <div className="container">
                    <div className="flex">
                        <div className="col-1">
                            <h2 className="header bold text-white">Guest List</h2>
                        </div>
                        <div className="col-2 text-right">
                            <div className="search">
                                <span className="search-icon"><img src={searchIcon} alt="Search Icon" /></span>
                                <input 
                                    ref={this.searchTerm}
                                    placeholder="Search.." 
                                    name="searchTerm" 
                                    value={this.state.searchTerm} 
                                    onChange={this.onChangeHandler}/>
                            </div>
                            <button className="button primary">Export</button>
                        </div>
                    </div>
                    <div className="tableWrapper">
                        <table>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Email Address</td>
                                    <td>Passport No</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderComponent}
                            </tbody>
                        </table>
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

const GuestListBase = compose(
    withRouter,
    connect(mapStateToProps),
    withFirebase
)(GuestList);

export default GuestListBase;