import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Custom Route
import PrivateRoute from './PrivateRoute';

//CSS style
import "../sass/main.scss";
<<<<<<< HEAD
import logo from "../assets/images/10th-Edition-LPF-Logo.png";

=======
>>>>>>> authentication

// Pages
import Home from '../pages/Home';
import Passport from '../pages/Passport';
import Admin from './../pages/Admin';
import GuestList from '../pages/GuestList'; // Protected Page

const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/passport" component={Passport} />
			<Route exact path="/admin" component={Admin} />
			<PrivateRoute exact path="/guest-list" component={GuestList} />
		</Switch>
	);
};

export default Router
