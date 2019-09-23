import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbr3c5FJOsKpRQo_-CGBadeLzgqHKU-XM",
    authDomain: "lp10-3038d.firebaseapp.com",
    databaseURL: "https://lp10-3038d.firebaseio.com",
    projectId: "lp10-3038d",
    storageBucket: "lp10-3038d.appspot.com",
    messagingSenderId: "431573825922",
    appId: "1:431573825922:web:1b3421d8e88cd42e58779b"
};
 
class Firebase {
    constructor() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.storage = firebase.storage();
        this.auth = firebase.auth();
    }

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    getGuestById = uid => this.database.ref(`guests/${uid}`);

    getGuests = () => this.database.ref('guests');
}

export default Firebase;