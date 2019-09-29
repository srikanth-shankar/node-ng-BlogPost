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
  getPosts(pgSz: number, currPg: number) {
    const queryParams = `?pgSz=${pgSz}&currPg=${currPg}`;
    return this.http.get('http://localhost:3000/api/posts'+queryParams).pipe(map((x:any)=>{
      return {posts: x.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
      }}), totalPosts: x.totalPosts}
    }));
  }

  addPost(post: Post){
    return this.http.post('http://localhost:3000/api/posts', post);
  }

  deletePost(postId) {
    return this.http.delete(`http://localhost:3000/api/posts/${postId}`);
  }

  getPostById(id: string){
    return this.posts.find(x=>x.id === id);
  }

  updatePost(id: string, title:string, content: string){
    const post: Post = {id: id, title: title, content: content};
    return this.http.put(`http://localhost:3000/api/posts/${post.id}`, post);
  }
}
