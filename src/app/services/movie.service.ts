import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = '5cbff4df'; 
  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}?apikey=${this.apiKey}&s=${query}`)
      .pipe(map(response => response.Search?.slice(0, 3) || []));
  }
}
