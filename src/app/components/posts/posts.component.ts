import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { findByUsername } from '../../store/users/users.actions';
import { Post } from '../../models/post';
import { addPost, findAllPostsPageable, loadPosts } from '../../store/posts/posts.action';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";
import { loadComments } from '../../store/commets/comments.action';

@Component({
  selector: 'app-posts',
  imports: [RouterModule, FormsModule, CommonModule, CommentsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  post: Post;
  user: User;
  userLogin: any;

  posts: Post[] = [];
  paginator: any = {};

  contentPostLength: number = 0;

  constructor(
    private storeUser: Store<{ users: any }>,
    private storePost: Store<{ posts: any }>,
    private storeComment: Store<{ comments: any }>,
    private storeAuth: Store<{ auth: any }>
  ) {
    this.post = new Post();
    this.user = new User();
    this.storeUser.select('users').subscribe((state) => {
      this.user = { ...state.user };
    });

    this.storePost.select('posts').subscribe((state) => {
      this.posts = state.posts;
      this.paginator = state.paginator;
    });

  }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem('login')!);
    this.storeUser.dispatch(
      findByUsername({ username: this.userLogin.user.username })
    );

    this.storePost.dispatch(loadPosts({ page: 0 }));
  }

  createPost(postForm: NgForm): void {
    if (postForm.valid) {
      this.storePost.dispatch(addPost({ postNew: this.post }));
    }
  }

  morePosts(page: number): void {
    this.storePost.dispatch(loadPosts({ page }));
  }

  readMore(post: Post): void {
    const updatedPost = { ...post, readMore: !post.readMore };
    this.posts = this.posts.map(p => (p === post ? updatedPost : p));
  }
}
