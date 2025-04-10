import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [];

  private url: string = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  findAllCommentsPageable(page: number, idPost: number): Observable<any> {
    return this.http.get<any>(`${this.url}/page/${page}/${idPost}`).pipe(
          map(response => {
            response.content = response.content.map((comment: Comment) => ({
              ...comment,
              readMore: false
            }));
            return response;
          })
        );
  }

  create(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment);
  }
}
