import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { addComment, loadComments } from '../../store/commets/comments.action';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { findByUsername } from '../../store/users/users.actions';
import { FormsModule, NgForm } from '@angular/forms';
import { Comment } from '../../models/comment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'comments',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit, OnChanges {
  comment: Comment;
  @Input() post: Post;
  userComment: User;
  userLogin: any;

  comments: Comment[] = [];
  paginator: any = {};

  contentPostLength: number = 0;

  constructor(
    private storeComment: Store<{ comments: any }>,
    private storeUser: Store<{ users: any }>,
    private storePost: Store<{ posts: any }>
  ) {
    this.comment = new Comment();
    this.post = new Post();
    this.userComment = new User();

    this.storeUser.select('users').subscribe((state) => {
      this.userComment = { ...state.user };
    });

    this.storeComment.select('comments').subscribe((state) => {
      if (state.comments && state.comments.commentsByPost) {
        this.comments = state.comments.commentsByPost[this.post.id] || [];
        this.paginator = state.comments.paginatorByPost[this.post.id] || {};
      } else {
        this.comments = [];
        this.paginator = {};
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['post'].currentValue);
    if (changes['post'] && changes['post'].currentValue) {
      this.storeComment.dispatch(
        loadComments({ page: 0, idPost: changes['post'].currentValue.id })
      );
    }
  }

  ngOnInit(): void {
    // this.userLogin = JSON.parse(sessionStorage.getItem('login')!);
    // this.storeUser.dispatch(
    //   findByUsername({ username: this.userLogin.user.username })
    // );
    //console.log(this.comments);
    //this.storeComment.dispatch(loadComments({ page: 0, idPost: this.post.id }));
  }

  createComment(commentForm: NgForm): void {
    if (commentForm.valid) {
      this.comment.post = this.post;
      //this.comment.userComment = this.userComment;
      console.log(this.comment);
      //this.storePost.dispatch(addComment({ commentNew: this.comment }));
    }
  }

  moreComments(page: number): void {
    this.storePost.dispatch(loadComments({ page, idPost: this.post.id }));
  }

  readMore(comment: Comment): void {
    const updatedComment = { ...comment, readMore: !comment.readMore };
    this.comments = this.comments.map((c) =>
      c === comment ? updatedComment : c
    );
  }
}
