// FIREBASE AUTHENTICATION API

import { auth } from './firebase';

    // SIGN UP
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

    // SIGN IN
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword (email, password);

    // SIGN OUT
export const doSignOut = () => 
    auth.signOut();

//   // Password Reset
// export const doPasswordReset = (email) =>
// auth.sendPasswordResetEmail(email);

//  // Password Change
// export const doPasswordUpdate = (password) =>
// auth.currentUser.updatePassword(password);