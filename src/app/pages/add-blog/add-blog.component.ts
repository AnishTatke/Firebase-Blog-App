import { FirestoreCRUDService } from './../../services/firestore-crud.service';
import { FirebaseAuthService } from './../../services/firebase-auth.service';
import { Blog } from './../../services/blog';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  constructor(public fireAuth : FirebaseAuthService, public firestoreHandler: FirestoreCRUDService, public router: Router) { }

  ngOnInit(): void {
  }

  title = ""
  content= ""
  date = formatDate(new Date(), 'dd/MM/yyyy, H:MM:ss', 'en')

  addPost(){
    let blog : Blog = {title: this.title, content: this.content, author: this.fireAuth.currentUser, time_created: this.date}
    console.log(blog)
    this.firestoreHandler.createNewBlog(blog)
    .then(res => {
      console.log(res)
      this.router.navigate(['/home'])
    })
  }

  getPosts(){

  }



}
