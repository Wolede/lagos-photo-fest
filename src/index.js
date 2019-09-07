import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // The brains of the react router 

// Redux Store
import store from './redux/store';

// Firebase
import Firebase, { FirebaseContext } from './db';

// Starter Component
import App from './App';
 
const app = (
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FirebaseContext.Provider>
    </Provider>
);
 
ReactDOM.render(app, document.getElementById('root'));
