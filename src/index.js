import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // The brains of the react router  

import Router from './router/index';
 
const app = (
    <BrowserRouter>
	    <Router />
	</BrowserRouter>);
 
ReactDOM.render(app, document.getElementById('root'));
