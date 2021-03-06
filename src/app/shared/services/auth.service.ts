import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import auth = firebase.auth;
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
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

  public allowNavigating: boolean = false;

  SignIn(email: any, password: any) {
    console.log('In sign in');
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('Signed in');
        this.ngZone.run(() => {
          console.log('Before navigating');
          this.allowNavigating = true;
          this.router.navigate(['games']).then(() => {console.log('Navigated'); this.allowNavigating = false;}).catch(err => console.log(err));
        });
        this.SetUserData(result.user);
      });
  }

  get isLoggedIn(): boolean {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null);
  }

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

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

}
