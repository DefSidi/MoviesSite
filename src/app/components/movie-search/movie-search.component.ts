import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';
  topMovies: any[] = [];
  showNoResultsMessage = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTopMovies();
  }

  loadTopMovies() {
    const defaultQuery = 'batman';
    const apiKey = '5cbff4df';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${defaultQuery}`;

    this.http.get(apiUrl).subscribe((response: any) => {
      if (response.Response === 'True') {
        this.topMovies = response.Search.slice(0, 3);
      } else {
        this.topMovies = [];
        console.error('Failed to load top movies');
      }
    });
  }

  searchMovies() {
    if (!this.searchQuery.trim()) {
      return;
    }

    const apiKey = '5cbff4df';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${this.searchQuery}`;

    this.http.get(apiUrl).subscribe((response: any) => {
      if (response.Response === 'True') {
        this.movies = response.Search.slice(0, 3); 
        this.showNoResultsMessage = false;
      } else {
        this.movies = [];
        this.showNoResultsMessage = true;
      }
    });
  }

  openImdbPage(imdbID: string) {
    const url = `https://www.imdb.com/title/${imdbID}`;
    window.open(url, '_blank');
  }
}
