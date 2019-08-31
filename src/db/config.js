import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBwLD0fO_g33gwm2ZpMZ-vvnxf0DFvag8",
    authDomain: "lagos-photo-fest.firebaseapp.com",
    databaseURL: "https://lagos-photo-fest.firebaseio.com",
    projectId: "lagos-photo-fest",
    storageBucket: "lagos-photo-fest.appspot.com",
    messagingSenderId: "663517403750",
    appId: "1:663517403750:web:c0e9d4f752ee66a7"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const database = firebase.database()

// export {database};
class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.auth = firebase.auth();
    }

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    getGuestById = uid => this.db.ref(`guests/${uid}`);

    getGuests = () => this.database.ref('guests');
}

export default Firebase;