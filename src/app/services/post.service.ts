import { Injectable } from "@angular/core";
import { Post } from "../models/post";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];

  private url: string = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  findAllPostsPageable(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/page/${page}`).pipe(
      map(response => {
        response.content = response.content.map((post: Post) => ({
          ...post,
          readMore: false
        }));
        return response;
      })
    );
  }

  findAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }
}