import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

@Injectable({providedIn: "root"})
export class PostService {
  public posts: Post[] = [];
  postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}
  getPosts() {
    return this.http.get('http://localhost:3000/api/posts').pipe(map((x:any)=>{
      return x.posts.map(post => {
        return {
          title: post.title,
        content: post.content,
        id: post._id
      }})
    }));
  }

  addPost(post: Post){
    return this.http.post('http://localhost:3000/api/posts', post);
  }

  deletePost(postId) {
    return this.http.delete(`http://localhost:3000/api/posts/${postId}`);
  }
}
