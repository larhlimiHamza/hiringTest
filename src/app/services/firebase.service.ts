import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {User} from "./user";
import {MatSnackBar} from "@angular/material/snack-bar";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userData: any;

  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private snackBar:MatSnackBar,

  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('ngUser', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('ngUser'));
      } else {
        localStorage.setItem('ngUser', null);
        JSON.parse(localStorage.getItem('ngUser'));
      }
    })
  }

  openSnackBar(message:string, action:string){
    this.snackBar.open(message,action,{
      duration:5000,
      verticalPosition:'top',
    });
  }
  isLoggedIn():boolean{
    const user = JSON.parse(localStorage.getItem('ngUser'));
    return (user!==null);
  }

  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('ngUser');
      this.router.navigate(['../']);
    })
  }
  signIn(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setUserData(res);
        this.router.navigate(['../home']);
      })
      .catch((err) => {
        this.openSnackBar(err,""); //TODO Handle errors
      })
  }

  signUp(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.openSnackBar("Account created successfully",'');
        this.setUserData(res);
        this.router.navigate(['../home']);
      }).catch((err) => {
        this.openSnackBar(err,""); //TODO Handle errors
      })
  }

  googleAuth(){
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((res) => {
        this.setUserData(res);
        this.router.navigate(['../home']);
      })
      .catch((error) => {
        window.alert(error)
      });
  }
  forgotPassword(email) {
    return this.angularFireAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.openSnackBar("Password reset email was sent to your email address","");
      }).catch((err) => {
        this.openSnackBar(err,"");
      })
  }
  setUserData(user){
    localStorage.setItem('ngUser', JSON.stringify(user));
    JSON.parse(localStorage.getItem('ngUser'));
  }
}
