import Rebase from 're-base';
import firebase from 'firebase';
const app = firebase.initializeApp({
  apiKey: "REALLYLONGNUMBER",
  authDomain: "yours.firebaseapp.com",
  databaseURL: "https://yours.firebaseio.com"
});
export const rebase = Rebase.createClass(app.database());

// //add the authProvides your app needs: google, facebook, twitter, github,
export const googleProvider = new firebase.auth.GoogleAuthProvider();