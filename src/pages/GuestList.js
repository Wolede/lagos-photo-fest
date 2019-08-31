import React, { Component } from 'react'
import GuestListItem from '../components/GuestListItem'
import searchIcon from '../assets/images/icons-search.svg'

export default class GuestList extends Component {

    state = {
		loading: false,
		guests: [],
		error: null
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

        if(guests){
            renderComponent = (
                guests.map((guest, index) => {
                    return <GuestListItem key={index} guest={guest} />
                })
            );
        }else{
            renderComponent = <td>There are no</td>
        }
        
        return (
            <section className="guest-list">
                <div className="container">
                    <p className="logout">Logout</p>
                    <div className="flex">
                        <div className="col-1">
                            <h2 className="header bold text-white">Guest List</h2>
                        </div>
                        <div className="col-2 text-right">
                            <div class="search">
                                <span class="search-icon"><img src={searchIcon} alt="" /></span>
                                <input placeholder="Search.."/>
                            </div>
                            <button class="button primary">Export</button>
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
