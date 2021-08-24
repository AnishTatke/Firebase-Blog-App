import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignedIn = false
  email=""
  password=""

  constructor(public fireAuthService : FirebaseAuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!==null){
      this.isSignedIn = true
    } else {
      this.isSignedIn = false
    }
  }

  async onClick() {
    console.log(this.email + " " + this.password)
    await this.fireAuthService.loginUser(this.email, this.password)
    if(this.fireAuthService.isLoggedIn) this.isSignedIn = true
  }

  async googleLogin(){
    await this.fireAuthService.loginwithGoogle()
    if(this.fireAuthService.isLoggedIn) this.isSignedIn = true
  }

  handleLogout(){
    this.isSignedIn = false
  }

}
