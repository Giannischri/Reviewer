import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Criterion } from '../models/criterion';
import {
  CriterionDto,
  CriterionCreateDto,
  CriterionUpdateDto
} from '../models/criteriondto';

import {
  mapCriterionDtoToModel,
  mapCriterionToCreateDto,
  mapCriterionToUpdateDto
} from '../utils/criterion-mapper'

@Injectable({
  providedIn: 'root'
})
export class CriterionService {
  private readonly baseUrl = '/api/criteria'; // Adjust to match your backend route

  constructor(private http: HttpClient) {}

  // ✅ GET all criteria for a given post
  getByPost(postId: string): Observable<Criterion[]> {
    return this.http.get<CriterionDto[]>(`${this.baseUrl}?postId=${postId}`).pipe(
      map(dtos => dtos.map(mapCriterionDtoToModel))
    );
  }

  // ✅ GET a single criterion by ID
  getById(id: string): Observable<Criterion> {
    return this.http.get<CriterionDto>(`${this.baseUrl}/${id}`).pipe(
      map(mapCriterionDtoToModel)
    );
  }

  // ✅ CREATE a new criterion
  create(criterion: Criterion): Observable<Criterion> {
    const dto: CriterionCreateDto = mapCriterionToCreateDto(criterion);
    return this.http.post<CriterionDto>(this.baseUrl, dto).pipe(
      map(mapCriterionDtoToModel)
    );
  }

  // ✅ UPDATE a criterion
  update(id: string, updates: Partial<Criterion>): Observable<Criterion> {
    const dto: CriterionUpdateDto = mapCriterionToUpdateDto(updates);
    return this.http.put<CriterionDto>(`${this.baseUrl}/${id}`, dto).pipe(
      map(mapCriterionDtoToModel)
    );
  }

  // ✅ DELETE a criterion
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
