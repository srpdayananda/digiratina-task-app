import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { HttpResponse } from '../../../shared/type/common';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.apiUrl
  }

  createBook(book: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.API_URL}/book`, book)
  }

  getBooks(id: string): Observable<HttpResponse> {
    let params = new HttpParams().append('id', id);
    return this.http.get<HttpResponse>(`${this.API_URL}/book`, { params })
  }

  updateBook(id: any): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${this.API_URL}/book`, id)
  }

  deleteBook(id: string): Observable<HttpResponse> {
    const params = new HttpParams().append('id', id);
    return this.http.delete<HttpResponse>(`${this.API_URL}/book`, { params })
  }

}
