// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../shared/models/post.model';
import { CriterionDTO } from '../shared/models/criterion.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`; // e.g., http://localhost:8080/api/posts

  constructor(private http: HttpClient) { }

  // --- Error Handling ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server Error: ${error.status} - ${error.message || ''}\n${JSON.stringify(error.error)}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // --- Common HTTP Headers ---
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + yourAuthToken // Add if you have authentication
    });
  }

  // --- API Calls ---

  /**
   * Fetches all posts.
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Fetches a single post by its ID.
   * @param id The ID of the post.
   */
  getPostById(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Fetches posts where the given ID is present in the 'rankers' list.
   * Assumes a backend endpoint like `/api/posts/by-ranker/{rankerId}` or `/api/posts?rankerId={rankerId}`.
   * @param rankerId The ID of the ranker.
   */
  getPostsByRanker(rankerId: number): Observable<Post[]> {
    // Option 1: Path variable (e.g., /api/posts/by-ranker/123)
    const url = `${this.apiUrl}/by-ranker/${rankerId}`;

    // Option 2: Query parameter (e.g., /api/posts?rankerId=123) - more flexible if multiple filters are needed
    // const params = new HttpParams().set('rankerId', rankerId.toString());
    // const url = this.apiUrl; // or `${this.apiUrl}/search` if your backend has a dedicated search endpoint

    return this.http.get<Post[]>(url, { headers: this.getHeaders() /* , params: params */ })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Fetches posts where the given ID is present in the 'candidates' list.
   * Assumes a backend endpoint like `/api/posts/by-candidate/{candidateId}` or `/api/posts?candidateId={candidateId}`.
   * @param candidateId The ID of the candidate.
   */
  getPostsByCandidate(candidateId: number): Observable<Post[]> {
    // Option 1: Path variable (e.g., /api/posts/by-candidate/456)
    const url = `${this.apiUrl}/by-candidate/${candidateId}`;

    // Option 2: Query parameter (e.g., /api/posts?candidateId=456)
    // const params = new HttpParams().set('candidateId', candidateId.toString());
    // const url = this.apiUrl;

    return this.http.get<Post[]>(url, { headers: this.getHeaders() /* , params: params */ })
      .pipe(
        catchError(this.handleError)
      );
  }

  // --- Existing methods (re-included for completeness) ---

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePost(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
}
