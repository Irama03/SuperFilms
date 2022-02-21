import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import auth = firebase.auth;
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // @ts-ignore
        JSON.parse(localStorage.getItem('user'));
      } else {
        // @ts-ignore
        localStorage.setItem('user', null);
        // @ts-ignore
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email: any, password: any) {
    console.log('In sign in');
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('Signed in');
        this.ngZone.run(() => {
          console.log('Before navigating');
          this.router.navigate(['games']).then(() => console.log('Navigated')).catch(err => console.log(err));
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log('User: ' + user.emailVerified);
    return (user !== null); // && user.emailVerified !== false);
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['games']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    console.log('In set user data: ' + user.email);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}
