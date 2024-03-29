import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  isLoggedIn() {
    if (this.userDetails === null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      emailID,
      password
    );
  }

  getLoggedInUser(): User {
    const loggedUser: User = new User();
    const user = this.firebaseAuth.auth.currentUser;

    if (user) {
      this.userDetails = user;
      if (user != null) {
        loggedUser.$key = user.uid;
        loggedUser.userName = user.displayName;
        loggedUser.emailId = user.email;
        loggedUser.avatar = user.photoURL;
        loggedUser.isAdmin = user.email === "clarissahoffmann@freenet.de" ? true : false;  // TODO make array of admins
      }
    } else {
      this.userDetails = null;
    }

    return loggedUser;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    if (user != null) {
      if (user.isAdmin === true) {
        return true;
      }
    }
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
