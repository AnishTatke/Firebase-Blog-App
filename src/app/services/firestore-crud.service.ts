import { Blog } from './blog';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCRUDService {

  constructor(public firestoreHandler: AngularFirestore) { }

  createNewBlog(blog: Blog){
    return this.firestoreHandler.collection('blogs').add(blog)
  }

  getAllBlogs(){
    return this.firestoreHandler.collection('blogs').snapshotChanges()
  }
}
