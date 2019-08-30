import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBwLD0fO_g33gwm2ZpMZ-vvnxf0DFvag8",
    authDomain: "lagos-photo-fest.firebaseapp.com",
    databaseURL: "https://lagos-photo-fest.firebaseio.com",
    projectId: "lagos-photo-fest",
    storageBucket: "",
    messagingSenderId: "663517403750",
    appId: "1:663517403750:web:c0e9d4f752ee66a7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database()

export {database};