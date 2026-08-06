import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../../core';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { MovieListResponse, MoviesList } from '../../../models/MovieList';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  http = inject(HttpClient);

  getMovieList(page = '1', type: MoviesList) {
    return this.http.get<MovieListResponse>(`${BASE_API_URL}/movie/${type}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ENVIRONMENT.apiKey}`,
      },
      params: {
        language: 'ru-RU',
        page,
      },
    });
  }

  getTvList(page = '1', type: MoviesList) {
    return this.http.get(`${BASE_API_URL}/tv/${type}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ENVIRONMENT.apiKey}`,
      },
      params: {
        language: 'ru-RU',
        page
      },
    });
  }
}
