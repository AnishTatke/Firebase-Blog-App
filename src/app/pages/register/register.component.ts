import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSignedIn = false
  email=""
  password=""
  userName=""

  constructor(public firebaseAuth: FirebaseAuthService) { }

  ngOnInit(): void {
  }

  async onClick(){
    await this.firebaseAuth.signUpUser(this.userName, this.email, this.password)
    if(this.firebaseAuth.isLoggedIn) this.isSignedIn = true
  }

  handleLogout(){
    this.isSignedIn = false
  }

}
