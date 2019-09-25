import { PostService } from './../../post.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../../post.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss']
})
export class PostCreateComponent {
  constructor(public postService: PostService){}

  onAddPost(postForm: NgForm): void {
    if(postForm.invalid) {
      return;
    }
    const post: Post = {id:null, title: postForm.value.title, content: postForm.value.content};
    this.postService.addPost(post).subscribe((data: any)=>{
      post.id = data.id;
      this.postService.posts.push(post);
      this.postService.postsUpdated.next(this.postService.posts);
    });
    postForm.reset();
  }
}
