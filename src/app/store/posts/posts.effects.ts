import { inject, Injectable } from "@angular/core";
import { PostService } from "../../services/post.service";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addPost, addPostSuccess, findAllPostsPageable, loadPosts, setErrorsPost } from "./posts.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Post } from "../../models/post";
import { addSuccess } from "../users/users.actions";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { findAllCommentsPageable } from "../commets/comments.action";

@Injectable()
export class PostsEffects {
    private service = inject(PostService);
    private actions$ = inject(Actions);
    private router = inject(Router);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
        ofType(loadPosts),
        exhaustMap((action) =>
            this.service.findAllPostsPageable(action.page).pipe(
                map((pageable) => {
                    const posts = pageable.content as Post[];
                    const paginator = pageable;

                    return findAllPostsPageable({ posts, paginator });
                }),
                catchError((error) => of(error))
            )
        )
        )
    );   

    addPost$ = createEffect(() =>
        this.actions$.pipe(
        ofType(addPost),
        exhaustMap((action) =>
            this.service.create(action.postNew).pipe(
            map((postNew) => addPostSuccess({ postNew })),
            catchError((error) => {
                if (error.status == 400) {
                return of(
                    setErrorsPost({
                        postForm: action.postNew,
                        errors: error.error,
                    })
                );
                }
                return of(error);
            })
            )
        )
        )
    );

    addSuccessPost$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(addPostSuccess),
            tap(() => {
                this.router.navigate(['/posts/page/0']);

                Swal.fire({
                    title: 'Publicado!',
                    text: 'Publicación creada con exito!',
                    icon: 'success',
                });
            })
        ),
        { dispatch: false }
    );
    
    constructor(){}
}