import { Blog } from './../../services/blog';
import { FirestoreCRUDService } from './../../services/firestore-crud.service';
import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Blog[] = [];
  constructor(public firebaseAuth: FirebaseAuthService, public firestoreHandler: FirestoreCRUDService) { }

  ngOnInit(): void {
    this.firestoreHandler.getAllBlogs()
    .subscribe(actionArray => {
      this.posts = actionArray.map(item => {
        return item.payload.doc.data() as Blog
      })
    })
  }


}
