import { PostService } from './../../post.service';
import { Component, Input } from '@angular/core';
import { Post } from '../../post.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss']
})
export class PostListComponent {
  posts: Post[];
  postSub: Subscription;
  totalPosts = 10;
  postsPerPg = 2;
  pageSzOptions= [1, 2,5,10];
  currPg = 1;
  constructor(private postService: PostService){}
  ngOnInit() {
    this.postSub = this.postService.postsUpdated.subscribe((posts: any)=>{
      this.posts = posts;
    });
    this.postService.getPosts(this.postsPerPg, this.currPg)
                  .subscribe((postData:any)=>{
                    this.posts=postData.posts;
                    this.totalPosts = postData.totalPosts;
                    this.postService.posts = this.posts;
                  });
  }

  onDelete(postId: any){
    this.postService.deletePost(postId)
    .subscribe(x=>{
      console.log('deleted');
      this.postService.posts = this.postService.posts.filter(x=>x.id != postId);
      this.postService.postsUpdated.next(this.postService.posts);
    });
  }

  onPgChanged(event: PageEvent){
    this.currPg = event.pageIndex + 1;
    this.postsPerPg = event.pageSize;
    this.postService.getPosts(this.postsPerPg, this.currPg)
                  .subscribe((postData:any)=>{
                    this.posts=postData.posts;
                    this.postService.posts = this.posts;
                  });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
