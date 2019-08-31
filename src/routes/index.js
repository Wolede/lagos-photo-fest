import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Custom Route
import PrivateRoute from './PrivateRoute';


//CSS style
import "../sass/main.scss";
import logo from "../assets/images/logo.png";


// Pages
import Home from '../pages/Home';
import Passport from '../pages/Passport';
import Admin from './../pages/Admin';
import GuestList from '../pages/GuestList'; // Protected Page

const Router = () => {
	return (
		<div className="cover__image">
			<div className="container passport__container">
				<div className="passport__div">
					<img src={logo} alt="logo" className="passport__div__logo"/>
				</div>

				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/passport" component={Passport} />
					<Route exact path="/admin" component={Admin} />
					<PrivateRoute exact path="/guest-list" component={GuestList} />
				</Switch>

			</div>
		</div>

	);
};

export default Router
