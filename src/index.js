import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // The brains of the react router  
import './sass/main.scss'

import Router from './routes/index';
 
const app = (
    <BrowserRouter>
	    <Router />
	</BrowserRouter>);
 
ReactDOM.render(app, document.getElementById('root'));
