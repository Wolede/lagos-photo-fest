import React, { Component } from 'react'
import GuestListItem from '../components/GuestListItem'
import searchIcon from '../assets/images/icons-search.svg'

// Redux
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// Firebase
import { withFirebase } from './../db';
import Logout from '../components/Logout';

class GuestList extends Component {

    state = {
		loading: false,
		guests: [],
		error: null
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

    componentDidMount(){
		if (!this.props.isAuthenticated) {
			this.props.history.push('/');
		}
		
		this.setState({ loading: true });
		console.log(this.props);
		
		this.props.firebase.getGuests().on('value', snapshot => {
			console.log(snapshot);
			console.log(snapshot.val());
			const guestsObject = snapshot.val();
			const guestsList = Object.keys(guestsObject).map(key => ({
				...guestsObject[key],
				uid: key,
            }));
			
			this.setState({
				guests: [...guestsList],
				loading: false,
			});
		});
	}

    render() {

        const { guests } = this.state;

        let renderComponent = null ;

        console.log(guests);

        if(guests){
            renderComponent = (
                guests.map((guest, index) => {
                    return <GuestListItem 
                        key={index} 
                        guest={guest}
                        onClick={this.viewGuestDetails}/>
                })
            );
        }else{
            renderComponent = <td>There are no guest details yet</td>
        }
        
        return (
            <section className="guest-list">
                <Logout />
                <div className="container">
                    <div className="flex">
                        <div className="col-1">
                            <h2 className="header bold text-white">Guest List</h2>
                        </div>
                        <div className="col-2 text-right">
                            <div className="search">
                                <span className="search-icon"><img src={searchIcon} alt="Search Icon" /></span>
                                <input placeholder="Search.."/>
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