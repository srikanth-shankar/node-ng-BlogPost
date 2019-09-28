import { PostService } from './../../post.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../../post.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss']
})
export class PostCreateComponent {
  private mode= 'create';
  postId: string;
  post: Post;

  constructor(public postService: PostService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode='edit';
        this.post = this.postService.getPostById(paramMap.get('postId'));
      }else {
        this.mode='create';
        this.postId = null;
      }
    })
  }

  onAddPost(postForm: NgForm): void {
    if(postForm.invalid) {
      return;
    }
    if(this.mode == 'create'){
      const tempPost: Post = {id:null, title: postForm.value.title, content: postForm.value.content};
      this.postService.addPost(tempPost).subscribe((data: any)=>{
        tempPost.id = data.id;
        this.postService.posts.push(tempPost);
        this.postService.postsUpdated.next(this.postService.posts);
      });
    } else {
      this.postService.updatePost(this.post.id, postForm.value.title, postForm.value.content)
        .subscribe((x)=>{
          let idx = this.postService.posts.findIndex(a=>a.id === this.post.id);
          this.postService.posts[idx].title = postForm.value.title;
          this.postService.posts[idx].content = postForm.value.content;
          this.postService.postsUpdated.next(this.postService.posts);
        })
    }

    postForm.reset();
  }
}
