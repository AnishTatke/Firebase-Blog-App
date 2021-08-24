import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn = false
  currentUser: string | null | undefined = "";
  constructor(public fireAuth: AngularFireAuth, public router: Router) {
  }

  async loginUser(email: string, password: string){
    await this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res)
      this.currentUser = res.user?.displayName
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
      this.router.navigate(['/home'])
    })
    .catch(err => {
      console.log(err)
      this.router.navigate(['/login'])
    })
  }

  async signUpUser(userName: string, email: string, password: string){
    await this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res)
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
      res.user?.updateProfile({
        displayName: userName
      })
      this.router.navigate(['/login'])
    })
    .catch(err => {
      console.log(err)
      this.router.navigate(['/register'])
    })
  }

  async loginwithGoogle() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res => {
      console.log(res)
      this.currentUser = res.user?.displayName
      this.isLoggedIn = true
      this.router.navigate(['/home'])
    })
  }

  logout() {
    this.fireAuth.signOut()
    .then(res => {
      console.log(res)
      this.isLoggedIn = false
      localStorage.removeItem('user')
      this.router.navigate(['/login'])
    })
    
  }
}
