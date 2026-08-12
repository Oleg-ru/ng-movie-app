import { Component, inject, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { SERVICES } from '../../../../core/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MENU_ITEMS } from '../../../../core/constants/menu.constants';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, AsyncPipe],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private activatedRoute = inject(ActivatedRoute);
  protected movieService = inject(SERVICES.movies);
  protected currentTitle = signal('');
  protected movieType = signal('');

  //Реактивная
  protected movies$ = this.activatedRoute.params.pipe(
    map((param) => {
      const title = MENU_ITEMS.find((item) => item.id === param['movieType'])?.children.find(
        (child) => child.route === param['category'],
      );

      return {
        ...param,
        title: title?.label,
      };
    }),
    //@ts-ignore
    tap((item) => {
      this.currentTitle.set(item.title ?? '');
    }),
    switchMap((params: { category: string; movieType: string; title: string }) => {
      const category = params['category'] ?? 'popular';
      const movieType = params['movieType'];

      if (movieType === 'movies') {
        this.movieType.set('фильмы')
        return this.movieService.getMovieList('1', category);
      }

      if (movieType === 'tv') {
        this.movieType.set('сериалы');
        return this.movieService.getTvList('1', category);
      }

      return of(null);
    }),
    catchError((err) => {
      console.error(err);
      return of(null);
    }),
  );
}
