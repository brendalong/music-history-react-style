import Rebase from 're-base';
import firebase from 'firebase';
const app = firebase.initializeApp({
   apiKey: "AIzaSyA60-RA1ZHZRXrmmAH-gsp1h7OpRFYWugY",
   authDomain: "d18-demo.firebaseapp.com",
   databaseURL: "https://d18-demo.firebaseio.com"
});
export const rebase = Rebase.createClass(app.database());

// //add the authProvides your app needs: google, facebook, twitter, github,
export const googleProvider = new firebase.auth.GoogleAuthProvider();