import { Component, inject } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { SERVICES } from '../../../../core/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListResponse, MoviesList } from '../../../../core/models/MovieList';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, AsyncPipe],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private activatedRoute = inject(ActivatedRoute);
  protected movieService = inject(SERVICES.movies);
  protected titleList: Record<Exclude<MoviesList, null>, string> = {
    popular: 'Популярные',
    now_playing: 'Сейчас смотрят',
    top_rated: 'Лучшие',
    upcoming: 'Ожидаемые',
  };

  //Реактивная
  protected category$ = this.activatedRoute.params.pipe(
    map((params) => params['category'] ?? 'popular'),
  );

  protected movies$ = this.activatedRoute.params.pipe(
    //TO-DO добавить map распрасить данные, далее tap для обновления заголовка и далее свич мап загрузки данных по результату map
    switchMap((params: Record<string, string>) => {
      const category = params['category'] ?? 'popular';
      const movieType = params['movieType'];

      if (movieType === 'movies') {
        return this.movieService.getMovieList('1', category);
      }

      if (movieType === 'tv') {
        return this.movieService.getTvList('1', category);
      }

      return of(null);
    }),
    catchError((err) => {
      console.error(err);
      return of(null);
    }),
  );
  protected currentTitle$ = this.category$.pipe(
    map((category: MoviesList) => this.titleList[category ?? 'popular'] || 'Фильмы'),
  );
}
