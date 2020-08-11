import app from "../../../node_modules/firebase/app";
import { fbConfig } from "../../config/config";
import "../../../node_modules/firebase/auth";
import "../../../node_modules/firebase/database";

class Firebase {
  constructor() {
    app.initializeApp(fbConfig);
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
