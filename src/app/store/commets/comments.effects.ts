import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Comment } from "../../models/comment";
import Swal from "sweetalert2";
import { CommentService } from "../../services/comment.service";
import { addComment, addCommentSuccess, findAllCommentsPageable, loadComments, setErrorsComment } from "./comments.action";

@Injectable()
export class CommentsEffects {
    private service = inject(CommentService);
    private actions$ = inject(Actions);
    private router = inject(Router);

    loadComments$ = createEffect(() =>
        this.actions$.pipe(
        ofType(loadComments),
        exhaustMap((action) =>
            this.service.findAllCommentsPageable(action.page, action.idPost).pipe(
                map((pageable) => {
                    const comments = pageable.content as Comment[];
                    const paginator = pageable;
                    const postId = action.idPost;

                    console.log(postId)

                    return findAllCommentsPageable({ comments, paginator, postId });
                }),
                catchError((error) => of(error))
            )
        ))
    );   

    addComment$ = createEffect(() =>
        this.actions$.pipe(
        ofType(addComment),
        exhaustMap((action) =>
            this.service.create(action.commentNew).pipe(
            map((commentNew) => addCommentSuccess({ commentNew })),
            catchError((error) => {
                if (error.status == 400) {
                    return of(
                        setErrorsComment({
                            commentForm: action.commentNew,
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

    addSuccessComment$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(addCommentSuccess),
            tap(() => {
                this.router.navigate(['/posts/page/0']);

                Swal.fire({
                    title: 'Publicado!',
                    text: 'Comentario creado con exito!',
                    icon: 'success',
                });
            })
        ),
        { dispatch: false }
    );
    
    constructor(){}
}