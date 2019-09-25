import { PostService } from './../../post.service';
import { Component, Input } from '@angular/core';
import { Post } from '../../post.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss']
})
export class PostListComponent {
  posts: Post[];
  postSub: Subscription;
  constructor(private postService: PostService){}
  ngOnInit() {
    this.postSub = this.postService.postsUpdated.subscribe((posts: any)=>{
      this.posts = posts;
    });
    this.postService.getPosts()
                  .subscribe((posts:any)=>{
                    this.posts=posts;
                    this.postService.posts = this.posts;
                  });
  }

  onDelete(postId: any){
    this.postService.deletePost(postId)
    .subscribe(x=>{
      console.log('deleted')
    });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
