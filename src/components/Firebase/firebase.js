import app from "../../../node_modules/firebase/app";
import "../../../node_modules/firebase/auth";
import "../../../node_modules/firebase/database";

const config = {
    apiKey: "AIzaSyChQxPgqX4baxZruTabYQffjVw5RQ2zB5U",
    authDomain: "student-dony.firebaseapp.com",
    databaseURL: "https://student-dony.firebaseio.com",
    projectId: "student-dony",
    storageBucket: "student-dony.appspot.com",
    messagingSenderId: "896674085185",
    appId: "1:896674085185:web:5c553d6207c47ec3"
  };

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.serverValue = app.database.ServerValue;
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // *** bookings API ***

  booking = uid => this.db.ref(`bookings/${uid}`);

  bookings = () => this.db.ref("bookings");

}

export default Firebase;
