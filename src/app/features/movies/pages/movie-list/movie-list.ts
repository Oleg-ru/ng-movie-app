import { Component, inject } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { SERVICE } from '../../../../core/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesList } from '../../../../core/models/MovieList';
import { catchError, map, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, AsyncPipe],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private activatedRoute = inject(ActivatedRoute);
  protected discoverService = inject(SERVICE.discover);
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
  protected discovers$ = this.category$.pipe(
    switchMap((category: MoviesList) => {
      return this.discoverService.getMovieList('1', category);
    }),
    catchError((err) => {
      console.error(err);
      return of(null);
    }),
  );
  protected currentTitle$ = this.category$.pipe(
    map((category: MoviesList) => this.titleList[category ?? 'popular'] || 'Фильмы'),
  );

  //Императивная
  // protected category = signal<MoviesList>('popular');
  // protected discovers = signal<MovieListResponse | null>(null);
  // protected currentTitle = computed(() => {
  //   const title = this.category();
  //   return this.titleList[title ?? 'popular'] ?? 'Фильмы';
  // });
  // loadMovies() {
  //   this.discoverService.getMovieList('1', this.category()).subscribe({
  //     next: (data) => this.discovers.set(data),
  //     error: (err) => console.error(err),
  //   });
  // }
  // ngOnInit() {
  //   this.activatedRoute.params.subscribe((params) => {
  //     console.log(params['category']);
  //     this.category.set(params['category']);
  //     console.log(this.category());
  //   });
  //   this.loadMovies();
  // }
}
