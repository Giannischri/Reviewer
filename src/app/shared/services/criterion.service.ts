// src/app/services/criterion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CriterionDTO } from '../shared/models/criterion';

@Injectable({
  providedIn: 'root'
})
export class CriterionService {
  private apiUrl = `${environment.apiUrl}/criteria`; // e.g., http://localhost:8080/api/criteria

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
  getCriterionById(id: string): Observable<CriterionDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CriterionDTO>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
  getCriteriaByPostId(postId: string): Observable<CriterionDTO[]> {
    // Option 1: Path variable (e.g., /api/criteria/by-post/123)
    const url = `${this.apiUrl}/by-post/${postId}`;
    return this.http.get<CriterionDTO[]>(url, { headers: this.getHeaders() /* , params: params */ })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Fetches a list of criteria that have a specific parentId.
   * Use null or a specific string for root criteria (if your backend handles it).
   * Assumes backend endpoint: GET /api/criteria/by-parent/{parentId} or /api/criteria?parentId={parentId}
   * @param parentId The ID of the parent criterion, or null for root criteria.
   */
  getCriteriaByParentId(parentId: string | null): Observable<CriterionDTO[]> {
    // Backend might handle 'null' parentId differently, e.g., /api/criteria/root
    // or /api/criteria?parentId=null
    let url: string;
    let params: HttpParams | undefined;

    if (parentId === null) {
      // Example for fetching root criteria: GET /api/criteria/root
      url = `${this.apiUrl}/root`;
      // Or if using query params: params = new HttpParams().set('parentId', 'null'); url = this.apiUrl;
    } else {
      // Example for fetching children of a specific parent: GET /api/criteria/by-parent/parent123
      url = `${this.apiUrl}/by-parent/${parentId}`;
      // Or if using query params: params = new HttpParams().set('parentId', parentId); url = this.apiUrl;
    }

    return this.http.get<CriterionDTO[]>(url, { headers: this.getHeaders(), params: params })
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * Fetches criteria that match a given path segment (e.g., criteria whose path starts with "root/tech").
   * This assumes your backend has a way to query by partial or full path array.
   * Assumes backend endpoint: GET /api/criteria/by-path or /api/criteria?path={segment1},{segment2}
   * @param pathSegments An array of strings representing parts of the path.
   */
  getCriteriaByPath(pathSegments: string[]): Observable<CriterionDTO[]> {
    // This is often handled by a query parameter where array elements are comma-separated
    // or by sending a list in the request body for POST/PUT if it's complex.
    // For GET, a comma-separated string is common: path=segment1,segment2,segment3
    const pathString = pathSegments.join(',');
    const params = new HttpParams().set('path', pathString);

    const url = `${this.apiUrl}/by-path`; // Or just this.apiUrl if you filter all with query param

    return this.http.get<CriterionDTO[]>(url, { headers: this.getHeaders(), params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Fetches criteria based on their 'subjective' status.
   * Assumes backend endpoint: GET /api/criteria?subjective=true or /api/criteria/subjective
   * @param isSubjective Boolean indicating whether to fetch subjective (true) or objective (false) criteria.
   */
  getCriteriaBySubjective(isSubjective: boolean): Observable<CriterionDTO[]> {
    // Using query parameter is typical for boolean filters
    const params = new HttpParams().set('subjective', isSubjective.toString());
    const url = this.apiUrl; // Filters all criteria via query param

    // Alternative: Dedicated endpoint like /api/criteria/subjective or /api/criteria/objective
    // const url = `${this.apiUrl}/${isSubjective ? 'subjective' : 'objective'}`;

    return this.http.get<CriterionDTO[]>(url, { headers: this.getHeaders(), params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // --- Example for creating/updating if needed (not requested but common) ---
  createCriterion(criterion: Omit<CriterionDTO, 'id' | 'path'>): Observable<CriterionDTO> { // Path often generated by backend
    return this.http.post<CriterionDTO>(this.apiUrl, criterion, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCriterion(criterion: CriterionDTO): Observable<CriterionDTO> {
    const url = `${this.apiUrl}/${criterion.id}`;
    return this.http.put<CriterionDTO>(url, criterion, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCriterion(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
}
